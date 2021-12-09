import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    news: newsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))