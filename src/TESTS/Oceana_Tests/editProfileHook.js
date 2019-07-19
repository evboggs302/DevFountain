import {useState} from "react";

// hook taken from "EditProfile.js"
// Oceana Unit Testing
function EditProfileTest() {
    var [className, setClassName] = useState("profile edit");
    return {className, setClassName}
  }
  
export default EditProfileTest;
  