const initialState = {
  allSkills: null,
  mySkills: null,
  theirSkills: null
};

const ALL_SKILLS = "ALL_SKILLS";
const SET_PERSONAL_SKILLS = "SET_PERSONAL_SKILLS";
const SET_THEIR_SKILLS = "SET_THEIR_SKILLS";

export default function Skills(state = initialState, action) {
  switch (action.type) {
    case ALL_SKILLS:
      return { ...state, allSkills: action.payload };
    case SET_PERSONAL_SKILLS:
      return { ...state, mySkills: action.payload };
    case SET_THEIR_SKILLS:
      return { ...state, theirSkills: action.payload };
    default:
      return state;
  }
}

export function setSkills(skills) {
  return {
    type: ALL_SKILLS,
    payload: skills
  };
}

export function setPersonalSkills(skills) {
  return {
    type: SET_PERSONAL_SKILLS,
    payload: skills
  };
}

export function setTheirSkills(skills) {
  return {
    type: SET_THEIR_SKILLS,
    payload: skills
  };
}
