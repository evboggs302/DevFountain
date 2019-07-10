const initialState = {
    user: [],
    redirect: false
    
}

const SET_USER = 'SET_USER'
const SET_REDIRECT = 'SET_REDIRECT'

export default function userReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            console.log('this is the user who logged in ', action.payload )
            return {...state, user: action.payload}
        case SET_REDIRECT:
            return {...state, redirect: action.payload}
        default:
            return 'this is the initial state', state
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}

export function setRedirect(redirect) {
    return {
        type: SET_REDIRECT,
        paylaod: redirect
    }
}