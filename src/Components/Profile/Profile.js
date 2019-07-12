import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import { Link, NavLink } from "react-router-dom";
// import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

function Profile(props) {
  console.log(props);
  const decoded = decodeURIComponent(props.match.params.email);
  const current = props.user.user.email === decoded;

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

  return (
    <div>
      {/* <div> */}
      <AppHeader {...props} />
      {/* </div> */}
      <div>
        <div>
          <img src={profile_pic} />
          {current ? <button>Edit Button</button> : null}
        </div>
        <div>
          {`${first} ${last}`}
          {current ? <button>Edit Button</button> : null}
        </div>
        <div>
          {title}
          {current ? <button>Edit Button</button> : null}
        </div>
      </div>
      <div>
        Contact Info
        <div>
          <Link to={portfolio}>Portfolio</Link>
          {current ? <button>Edit Button</button> : null}
        </div>
        <div>
          {/* <Link to={email}>Email</Link> */}
          <Link to="evboggs94@gmail.com">Email</Link>
          {current ? <button>Edit Button</button> : null}
        </div>
        <div>
          {/* <Link to={linkedin}>LinkedIn</Link> */}
          <NavLink to="https://www.linkedin.com/in/evansboggs/">
            LinkedIn
          </NavLink>
          {linkedin}
          {current ? <button>Edit Button</button> : null}
        </div>
      </div>
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

export default invokedConnect(Profile);
