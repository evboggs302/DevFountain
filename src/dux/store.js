import {createStore, combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import postsReducer from './reducers/postsReducer'
import networkReducer from './reducers/networkReducer'


const rootReducer = combineReducers(
    {
        userReducer: userReducer,
        messageReducer: messageReducer,
        postsReducer: postsReducer,
        networkReducer: networkReducer
    })

export default createStore(rootReducer)