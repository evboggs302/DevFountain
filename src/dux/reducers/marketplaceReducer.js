const initialState = {
    allDevelopers: []
}

const ALL_DEVELOPERS = "ALL_DEVELOPERS"


export default function marketplaceReducer(state = initialState, action){
    switch(action.type){
        case ALL_DEVELOPERS:
            console.log('this is all the developers', action.payload)
            return {...state, allDevelopers: action.payload}
        default:
            return 'this is the initial state', state
    }
}

export function allDevelopers(developers){
    return {
        type: ALL_DEVELOPERS,
        payload: developers
    }
}