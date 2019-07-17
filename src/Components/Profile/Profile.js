import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import EditProfile from "./EditProfile";
import OtherPerson from "./OtherPerson";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
import axios from "axios";

function Profile(props) {
  // console.log(props);

  let [className, setClassName] = useState("profile");

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }
  const decoded = decodeURIComponent(props.match.params.email);
  const current = props.user.user.email === decoded;

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

  // if (!current) {
  //   axios.get(`/api/others/${decoded}`).then(response => {
  //     console.log(response.data);
  //     props.setOtherPerson(response.data);
  //     return;
  //   });
  // }

  console.log(props);
  return (
    <div>
      <AppHeader {...props} />
      {current ? (
        <div>
          <div>
            <div>
              <div>
                <img src={profile_pic} />
              </div>
              <div>{`${first} ${last}`}</div>
              <div>{title}</div>
            </div>
            <div>
              Contact Info
              <div>
                <a href={portfolio} target="_blank">
                  Portfolio
                </a>
              </div>
              <div>
                <a href={email} target="_blank">
                  Email
                </a>
              </div>
              <div>
                <a href={linkedin} target="_blank">
                  LinkedIn
                </a>
              </div>
              {developer ? <ViewSkills {...props} /> : null}
              {current ? (
                <button onClick={() => setClassName(className + " edit")}>
                  Edit Profile
                </button>
              ) : (
                <button>Follow</button>
              )}
            </div>
          </div>
          {/* {myPostsMapped.length ? <div>{myPostsMapped}</div> : null} */}
        </div>
      ) : (
        <OtherPerson {...props} />
      )}
      <div className={className}>
        <EditProfile {...props} />
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setOtherPerson
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
