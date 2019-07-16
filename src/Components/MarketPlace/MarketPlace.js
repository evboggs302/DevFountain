import React, { useState, useEffect } from "react";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import "./MarketPlace.scss";
import usefetch from "../usefetch";

function MarketPlace(props) {
  if (!props.user.user) {
    return <div />;
  }

  // These are used for the Redirecting action
  const [state, setState] = useState(false);
  const [developer, setDeveloper] = useState(null);
  console.log(props);

  let redirectToDeveloper = email => {
    setState(true);
    setDeveloper(email);
  };

  // When user clicks on the follow button, 'followDeveloper' then makes a POST to the endpoint 'follow' and updates the following table in SQL
  const { data: developerToFollow, postData: postData } = usefetch(
    "/api/follow",
    true,
    []
  );
  const [followButton, setFollowButton] = useState(false);
  const { user_id } = props.user.user;

  let followDeveloper = id => {
    postData([user_id, id]);
    setFollowButton(true);
  };

  // Rendering each developers info on marketplace
  const developers = props.marketplace.allDevelopers;
  let mappedDevs;
  if (developers !== null) {
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
          {!followButton ? (
            <button onClick={() => followDeveloper(dev.user_id)}>Follow</button>
          ) : (
            <button>Unfollow</button>
          )}
        </div>
        /* </Link> */
      );
    });
  }

  return (
    <div>
      <AppHeader />
      <main className="devs">
        {state ? <Redirect to={`profile/${developer}`} /> : null}
        {mappedDevs}
      </main>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setDevelopers
};
const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(MarketPlace);
