import React, { useState, useEffect } from "react";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { setFollowing } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import "./MarketPlace.scss";
import usefetch from "../usefetch";
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

  // When user clicks on the follow button, 'followDeveloper' then makes a Put to the endpoint 'follow' and updates the following table in SQL
  const { data: devsIFollow, putData: updateFollowing } = usefetch(
    "/api/following",
    false,
    []
  );

  const addDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let copy = following.slice();
    copy.push(id);
    console.log("og list: ", following);
    console.log("copy: ", copy);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: copy })
      .then(response => {
        console.log(response.data);
        props.setFollowing(response.data);
      });
  };

  const removeDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let list = following.slice();
    let index = list.indexOf(id);
    list.splice(index, 1);
    console.log("og list: ", list);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: list })
      .then(response => {
        console.log(response.data);
        props.setFollowing(response.data);
      });
  };

  useEffect(() => {
    console.log("following data updated:", devsIFollow);
    props.setFollowing(devsIFollow);
  }, [devsIFollow]);

  // Rendering each developers info on marketplace
  const developers = props.marketplace.allDevelopers;
  const alreadyFollowing = props.user.following;
  let mappedDevs;
  if (developers && alreadyFollowing) {
    mappedDevs = developers.map(dev => {
      const encoded = encodeURIComponent(dev.email);
      const default_pic =
        "https://www.uic.mx/posgrados/files/2018/05/default-user.png";

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
            <button onClick={() => addDev(dev.user_id)}>Follow</button>
          ) : (
            <button onClick={() => removeDev(dev.user_id)}>Unfollow</button>
          )}
        </div>
        /* </Link> */
      );
    });
  }

  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
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
