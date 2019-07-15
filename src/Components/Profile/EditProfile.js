import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

function EditProfile(props) {
  const { allSkills } = props.skills;
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
  let [newPortfolio, setPortfolio] = useState(null);
  let [className, setClassName] = useState("profile edit");
  let [newPic, setPic] = useState(null);

  let { postDataWithId: updateInfo } = usefetch("/api/edit", false);
  let { postDataWithId: addSkill, deleteData: removeSkill } = usefetch(
    "/api/skills/:id",
    false
  );

  const finished = () => {
    let dataToPost = {
      first: newFirst || first,
      last: newLast || last,
      title: newTitle || title,
      linkedin: newLinked || linkedin,
      portfolio: newPortfolio || portfolio,
      profile_pic: newPic || profile_pic
      // skills: newSkills || skills
    };
    updateInfo(user_id, dataToPost);
    setClassName("profile");
  };

  return (
    <div className={className}>
      <div>
        <div>
          <img src={profile_pic} />
          <button onClick={() => setPic()}>Change Picture</button>
        </div>
        <div>
          <input placeHolder={first} onChange={e => setFirst(e.target.value)} />
          <input placeHolder={last} onChange={e => setLast(e.target.value)} />
        </div>
        <div>
          <input placeHolder={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <div>{email}</div>
        </div>
        <div>
          <input
            placeHolder={linkedin}
            onChange={e => setLinked(e.target.value)}
          />
        </div>
        <div>
          <input
            placeHolder={portfolio}
            onChange={e => setPortfolio(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => finished()}>Finished Editing</button>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(EditProfile);
