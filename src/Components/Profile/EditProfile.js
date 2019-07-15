import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setMySkills } from "../../dux/reducers/skillsReducer";
import Select from "react-select";

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
  let [newSkills, setSkills] = useState(mySkills);
  let [newLast, setLast] = useState(null);
  let [newTitle, setTitle] = useState(null);
  let [newLinked, setLinked] = useState(null);
  let [newPortfolio, setPortfolio] = useState(null);
  let [className, setClassName] = useState("profile edit");
  let [newPic, setPic] = useState(null);

  let { postDataWithId: updateInfo } = usefetch("/api/edit", false);
  let { putData: updateSkills } = usefetch(`/api/skills/${user_id}`, false);

  // console.log(allSkills);
  var options = [];
  allSkills.map(e => {
    return options.push({
      value: e.skill,
      label: e.skill,
      skill_id: e.skill_id,
      icon: e.icon
    });
  });

  const finished = () => {
    let dataToPost = {
      first: newFirst || first,
      last: newLast || last,
      title: newTitle || title,
      linkedin: newLinked || linkedin,
      portfolio: newPortfolio || portfolio,
      profile_pic: newPic || profile_pic
      // skills: newSkills || mySkills
    };
    updateInfo(user_id, dataToPost);
    setMySkills(newSkills);
    updateSkills(user_id, newSkills);
    setClassName("profile");
  };

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
    linkedinFiller = title;
  }
  var portfolioFiller;
  if (!portfolio) {
    portfolioFiller = "Your Portfolio";
  } else {
    portfolioFiller = title;
  }

  console.log("props:", props);
  console.log("options", options);
  console.log("my skills", newSkills);

  return (
    <div className={className}>
      <div>
        <div>
          <img src={profile_pic} />
          <button onClick={() => setPic()}>Change Picture</button>
        </div>
        <div>
          <input placeholder={first} onChange={e => setFirst(e.target.value)} />
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
            placeHolder={portfolioFiller}
            onChange={e => setPortfolio(e.target.value)}
          />
        </div>
        <Select
          closeMenuOnSelect={false}
          defaultValue={"Select Your Skills"}
          isMulti
          name="colors"
          options={options}
          onChange={setSkills}
        />
      </div>
      <button onClick={() => finished()}>Finished Editing</button>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setMySkills
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(EditProfile);
