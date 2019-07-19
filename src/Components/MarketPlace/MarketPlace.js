import React, { useState, useEffect } from "react";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { setFollowing } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import "./MarketPlace.scss";
import axios from "axios";

function MarketPlace(props) {
  // const [followButton, setFollowButton] = useState(false);
  // These are used for the Redirecting action
  const [redirect, setRedirect] = useState(false);
  const [developer, setDeveloper] = useState(null);

  console.log(props);

  const redirectToDeveloper = email => {
    setDeveloper(email);
    setRedirect(true);
  };

  const addDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let copy = following.slice();
    copy.push(id);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: copy })
      .then(response => {
        props.setFollowing(response.data);
      });
  };

  const removeDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let list = following.slice();
    let index = list.indexOf(id);
    list.splice(index, 1);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: list })
      .then(response => {
        props.setFollowing(response.data);
      });
  };

  // Rendering each developers info on marketplace
  const { user_id } = props.user.user;
  const developers = props.marketplace.allDevelopers;
  const alreadyFollowing = props.user.following;
  let mappedDevs;
  if (developers && alreadyFollowing) {
    mappedDevs = developers.map(dev => {
      const encoded = encodeURIComponent(dev.email);
      const default_pic =
        "https://www.uic.mx/posgrados/files/2018/05/default-user.png";
      if (user_id === dev.user_id) {
        return [];
      }
      return (
        // <Link to={`/profile/${encoded}`} style={{ textDecoration: 'none' }} >
        <div key={dev.user_id} className="developer-card">
          {!dev.profile_pic ? (
            <img
              src={default_pic}
              onClick={() => redirectToDeveloper(encoded)}
            />
          ) : (
            <img
              src={dev.profile_pic}
              onClick={() => redirectToDeveloper(encoded)}
            />
          )}
          <h1 className="dev-name">Name: {`${dev.first} ${dev.last}`}</h1>
          <h2 className="dev-title">Title: {dev.title} </h2>
          <h2 className="dev-email">Email: {dev.email}</h2>
          <button
            className="view-developer"
            onClick={() => redirectToDeveloper(encoded)}
          >
            View Developer
          </button>
          {!alreadyFollowing.includes(dev.user_id) ? (
            <button onClick={() => addDev(dev.user_id)} className='follow-button'>Follow</button>
          ) : (
            <button onClick={() => removeDev(dev.user_id)} className='unfollow-button'>Unfollow</button>
          )}
        </div>
        /* </Link> */
      );
    });
  }

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  console.log(props);
  return (
    <div>
      <AppHeader {...props} />
      <main className="devs">
        {redirect ? <Redirect to={`profile/${developer}`} /> : null}
        {mappedDevs}
      </main>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setDevelopers,
  setFollowing
};
const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(MarketPlace);
