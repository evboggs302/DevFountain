const initialState = {
  allSkills: null,
  mySkills: null
};

const ALL_SKILLS = "ALL_SKILLS";
const SET_PERSONAL_SKILLS = "SET_PERSONAL_SKILLS";

export default function Skills(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case ALL_SKILLS:
      console.log("these are all the skills", action.payload);
      return { ...state, allSkills: action.payload };
    case SET_PERSONAL_SKILLS:
      console.log("these are my skills", action.payload);
      return { ...state, mySkills: action.payload };
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
  console.log(skills);
  return {
    type: SET_PERSONAL_SKILLS,
    payload: skills
  };
}
