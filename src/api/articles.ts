import axios from 'axios'
import { Article } from '../../types'

const API_URL = import.meta.env.VITE_API_URL || ''

export const getArticles = async (payload: { cursor: number, pageSize: number }): Promise<{ data: Article[], nextId: number | undefined, previousId: number | undefined }> => {


	const ids = await axios.get<number[]>(`${API_URL}/newstories.json`).then(res => res.data)
	const slice = ids.slice(payload.cursor * payload.pageSize, (payload.cursor + 1) * payload.pageSize)
	const results = await Promise.all(slice.map(id => getArticle(id)))
	return {
		data: results,
		nextId: ids.length / payload.pageSize > payload.cursor + 1 ? payload.cursor + 1 : undefined,
		previousId: payload.cursor - 1 > 0 ? payload.cursor - 1 : 0
	}

}

export const getSavedArticles = async (payload: { cursor: number, pageSize: number }): Promise<{ data: Article[], nextId: number | undefined, previousId: number | undefined }> => {
	const ids: number[] = JSON.parse(localStorage.savedArticles || '[]')
	const slice = ids.slice(payload.cursor * payload.pageSize, (payload.cursor + 1) * payload.pageSize)
	const results = await Promise.all(slice.map(id => getArticle(id)))
	const savedArticles = results.map(article => ({ ...article, saved: ids.includes(article.id) }))
	return {
		data: savedArticles,
		nextId: ids.length / payload.pageSize > payload.cursor + 1 ? payload.cursor + 1 : undefined,
		previousId: payload.cursor - 1 > 0 ? payload.cursor - 1 : 0
	}
}

export const getArticle = async (id: number) => axios.get<Article>(`${API_URL}/item/${id}.json`).then((response) => {
	const savedArticles = JSON.parse(localStorage.savedArticles || '[]')
	response.data.saved = savedArticles.includes(response.data.id)
	return response.data
})

export const saveArticle = async (id: number): Promise<number[]> => {
	// grab the saved articles from local storage
	let savedArticles = JSON.parse(localStorage.savedArticles || '[]')
	// if the article is already saved, remove it from the list
	if (savedArticles.includes(id)) savedArticles = savedArticles.filter((x: number) => x !== id)
	// otherwise, add it to the top of the list
	else savedArticles.unshift(id)
	// save the updated list back to local storage
	localStorage.savedArticles = JSON.stringify(savedArticles)
	// return the updated list
	return savedArticles
}

