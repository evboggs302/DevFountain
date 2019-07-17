import React, { useState, useEffect } from "react";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";
import { setPersonalSkills } from "../../dux/reducers/skillsReducer";
import Select from "react-select";
import axios from "axios";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/devmountain-phx/image/upload";

function EditProfile(props) {
  const { allSkills, mySkills } = props.skills;
  const {
    developer,
    email,
    first,
    last,
    linkedin,
    portfolio,
    profile_pic,
    title,
    user_id
  } = props.user.user;

  let [newFirst, setFirst] = useState(null);
  let [newLast, setLast] = useState(null);
  let [newTitle, setTitle] = useState(null);
  let [newLinked, setLinked] = useState(null);
  let [newSkills, setTHESkills] = useState([]);
  let [newPortfolio, setPortfolio] = useState(null);
  let [className, setClassName] = useState("profile edit");
  let [uploadedImage, setUploadedImage] = useState(null);
  let [loading, setLoading] = useState(false);
  let { putData: updateInfo } = usefetch("/api/edit", false);

  const finished = () => {
    let dataToPost = {
      first: newFirst || first,
      last: newLast || last,
      title: newTitle || title,
      linkedin: newLinked || linkedin,
      portfolio: newPortfolio || portfolio
    };
    console.log(dataToPost);
    updateInfo(user_id, dataToPost);
    if (uploadedImage) {
      console.log("pic is changing");
      saveImageToDB();
    }
    updateSkills();
    setClassName("profile");
  };

  useEffect(() => {
    setTHESkills(mySkills);
  }, []);

  useEffect(() => {
    var prevSavedSkills = [];
    if (mySkills) {
      for (let k = 0; k < allSkills.length; k++) {
        for (let i = 0; i < mySkills.length; i++) {
          if (allSkills[k].skill_id === mySkills[i]) {
            prevSavedSkills.push(allSkills[k]);
          }
        }
      }
    }
    var currentSkills = prevSavedSkills.map(e => {
      return {
        value: e.skill,
        label: e.skill,
        skill_id: e.skill_id,
        icon: e.icon
      };
    });
    setTHESkills(currentSkills);
  }, [mySkills]);

  const updateSkills = () => {
    let skillID = newSkills.map(e => e.skill_id);
    console.log(skillID);
    axios
      .put(`/api/new_skills`, { skillID })
      .then(response => {
        console.log(response.data.skills);
        props.setPersonalSkills(response.data.skills);
      })
      .catch(err => console.log(err));
  };

  //////////////////////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  var options = allSkills.map(e => {
    return {
      value: e.skill,
      label: e.skill,
      skill_id: e.skill_id,
      icon: e.icon
    };
  });

  //cloudinary.
  //this function will initiate the signature request from the server when someone has uploaded an image to the client.
  const handleImageUpload = file => {
    //axios call to server to request hashed signature
    axios.get("/api/upload").then(response => {
      //store the payload passed from the server from the axios call and insert it along
      //with the image-file, api key, and timestamp into a new form using new FormData()
      let formData = new FormData();
      formData.append("signature", response.data.signature);
      formData.append("api_key", "338231278645355");
      formData.append("timestamp", response.data.timestamp);
      formData.append("file", file[0]);
      setLoading(true);

      axios
        .post(CLOUDINARY_UPLOAD_URL, formData)
        .then(response => {
          console.log(response.data);
          //once an image is uploaded, cloundinary will send a response back with a secure url.
          setUploadedImage(response.data.secure_url);
        })
        .catch(err => {
          console.log("image did not upload", err);
        });
    });
  };
  //then we will want to save the image to the users profile pic in the database
  function saveImageToDB() {
    console.log(uploadedImage);
    axios
      .put(`/api/image/${user_id}`, { profile_pic: uploadedImage })
      .then(res => {
        console.log(res.data);
        props.setUser(res.data);
      })
      .catch(err => {
        console.log("image did not update", err);
      });
  }

  var titleFiller;
  if (!title) {
    titleFiller = "Your Title";
  } else {
    titleFiller = title;
  }
  var linkedinFiller;
  if (!linkedin) {
    linkedinFiller = "Your LinkedIn";
  } else {
    linkedinFiller = linkedin;
  }
  var portfolioFiller;
  if (!portfolio) {
    portfolioFiller = "Your Portfolio";
  } else {
    portfolioFiller = portfolio;
  }

  const decoded = decodeURIComponent(props.match.params.email);
  const current = props.user.user.email === decoded;

  return (
    <div className={className}>
      {current ? (
        <div>
          <div>
            <img src={profile_pic} />
            <input
              type="file"
              onChange={e => handleImageUpload(e.target.files)}
            />
          </div>
          <div>
            <input
              placeholder={first}
              onChange={e => setFirst(e.target.value)}
            />
            <input placeholder={last} onChange={e => setLast(e.target.value)} />
          </div>
          <div>
            <input
              placeholder={titleFiller}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div>{email}</div>
          </div>
          <div>
            <input
              placeholder={linkedinFiller}
              onChange={e => setLinked(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder={portfolioFiller}
              onChange={e => setPortfolio(e.target.value)}
            />
          </div>
          {developer ? (
            <Select
              name="skills"
              isMulti
              options={options}
              onChange={setTHESkills}
              value={newSkills}
              isSearchable={true}
              backspaceRemovesValue={true}
              closeMenuOnSelect={false}
            />
          ) : null}
          <button onClick={() => finished()}>Finished Editing</button>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPersonalSkills,
  setUser
};

// const invokedConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
// export default invokedConnect(EditProfile);
