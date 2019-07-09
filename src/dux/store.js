import {createStore, combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import postsReducer from './reducers/postsReducer'
import marketplaceReducer from './reducers/marketplaceReducer'



const rootReducer = combineReducers(
    {
        userReducer: userReducer,
        messageReducer: messageReducer,
        postsReducer: postsReducer,
        marketplaceReducer: marketplaceReducer
    })

export default createStore(rootReducer)