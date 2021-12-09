import axios from 'axios'
import {API_URL} from "../API/http";
import {setUser} from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/registration`,{
            email, password
        })
        alert(response.data.message)
    } catch (e) {
        console.log(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email, password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}