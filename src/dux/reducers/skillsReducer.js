const initialState = {
  allSkills: [],
  mySkills: []
};

const ALL_SKILLS = "ALL_SKILLS";
const MY_SKILLS = "MY_SKILLS";

export default function allSkills(state = initialState, action) {
  switch (action.type) {
    case ALL_SKILLS:
      console.log("these are all the skills", action.payload);
      return { ...state, allSkills: action.payload };
    case MY_SKILLS:
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

export function setMySkills(skills) {
  return {
    type: MY_SKILLS,
    payload: skills
  };
}
