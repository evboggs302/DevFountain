import React, { Component, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import { connect } from "react-redux";
import { followingPosts } from "../../dux/reducers/postsReducer";
import axios from "axios";
import "./NewsFeed.scss";
import UseFetch from "../usefetch";
import CreatePost from "./createpost/CreatePost";
import MyInfo from "./myInfo/MyInfo";

function NewsFeed(props) {
  const { following } = props.user;
  let postsToSee = [];
  console.log(following)

  useEffect(() => {
    if (props.user.user !== null) {
      if (following != null) {
        following.map(val => {
          console.log(val)
          axios.get(`/api/following-posts/${val}`).then(res => {
              console.log(res.data)
              if (res.data.length > 0) {
                console.log(res.data)
                postsToSee.push(res.data);
              }
              console.log(postsToSee)
              props.followingPosts(postsToSee); //setting posts unto redux
            })
            .catch(err =>
              console.log("Error getting posts of those who you follow")
            );
        });
      }
    }
  }, [following]);

  

  console.log(props)

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  // Display each post
  let { followingPosts } = props.posts;
  console.log(followingPosts)
  
  let mappedPosts;
  if (followingPosts) {
    followingPosts = followingPosts.flat();
    console.log(followingPosts)

    mappedPosts = followingPosts.map(val => {
      return (
        <div className="post-card">
          <div className="post-user-info">
            <img src={val.profile_pic} />
            <div className="user_info">
              <h1>
                {val.first} {val.last}
              </h1>
              <h2>{val.time_entered}</h2>
            </div>
          </div>
          <div className="post-content">
            <p>{val.content}</p>
          </div>
        </div>
      );
    });
  }

  if (!props.user.user) {
    return <div />;
  }

  console.log(props);
  return (
    <div>
      <header>
        <AppHeader {...props} />
      </header>
      <main className="newsfeed-page">
        <div>
          <MyInfo />
        </div>
        <div className="newsfeed">
          <CreatePost />
          <div>{mappedPosts}</div>
        </div>
      </main>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  followingPosts
};

const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(NewsFeed);
