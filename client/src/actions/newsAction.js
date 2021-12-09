import axios from "axios";
import {API_URL} from "../API/http";
import {addNewsToState, addSingleNewsCommentsToState, addSingleNewsToState, setLoading} from "../reducers/newsReducer";

export const addToNews = async (title, description, urlIMG) => {
    try {
        const response = await axios.post(`${API_URL}/news/add`, {
            title, description, urlIMG
        })
        alert(response.data.message)
    } catch (e) {
        console.log(e)
        alert(e.response.data.message)
    }
}

export const getNewsFromState = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/news/getnews`)
            dispatch(addNewsToState(response.data))
            dispatch(setLoading())
        } catch (e) {
            console.log(e)
        }
    }
}

export const getSingleNewsFromState = (newsId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/news/getsinglenews/${newsId}`)
            dispatch(addSingleNewsToState(response.data))
            dispatch(setLoading())
        } catch (e) {
            console.log(e)
        }
    }
}

export const addCommentToNews = async (newsId, comment) => {
    try {
        const response = await axios.post(`${API_URL}/news/addcomment/${newsId}`, {comment}, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
    } catch (e) {
        console.log(e)
    }
}

export const getCommentFromSingleNews = (newsId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/news/getcomments/${newsId}`)
            dispatch(addSingleNewsCommentsToState(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}