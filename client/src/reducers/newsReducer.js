export const ADD_TO_NEWS = 'ADD_TO_NEWS'
export const IS_LOADING = 'IS_LOADING'
export const ADD_SINGLE_NEWS = 'ADD_SINGLE_NEWS'
export const GET_SINGLE_NEWS_COMMENTS = 'ADD_SINGLE_NEWS_COMMENTS'

const defaultState = {
    news: [],
    isLoading: true,
    singleNews: [],
    singleNewsComments: []
}

export default function newsReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_TO_NEWS:
            return {
                ...state, news: action.payload
            }
        case IS_LOADING:
            return {
                ...state, isLoading: false
            }
        case ADD_SINGLE_NEWS:
            return {
                ...state, singleNews: action.payload
            }
        case GET_SINGLE_NEWS_COMMENTS:
            return {
                ...state, singleNewsComments: action.payload
            }
        default:
            return state
    }
}

export const addNewsToState = (news) => ({
    type: ADD_TO_NEWS,
    payload: news.reverse()
})
export const addSingleNewsToState = (news) => ({
    type: ADD_SINGLE_NEWS,
    payload: news
})
export const addSingleNewsCommentsToState = (comments) => ({
    type: GET_SINGLE_NEWS_COMMENTS,
    payload: comments.reverse()
})
export const setLoading = () => ({
  type: IS_LOADING
})