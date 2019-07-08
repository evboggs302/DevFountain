import {createStore, combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import postsReducer from './reducers/postsReducer'


const rootReducer = combineReducers(
    {
        userReducer: userReducer,
        messageReducer: messageReducer,
        postsReducer: postsReducer
    })

export default createStore(rootReducer)