const initialState = {
    allSkills: []
}

const ALL_SKILLS = "ALL_SKILLS"

export default function allSkills(state = initialState, action){
    switch(action.type){
        case ALL_SKILLS:
            console.log('these are all the skills', action.payload)
            return {...state, allSkills: action.payload}
        default:
            return 'this is the initial state', state
    }
}

export function setSkills(skills){
    return {
        type: ALL_SKILLS,
        payload: skills
    }
}