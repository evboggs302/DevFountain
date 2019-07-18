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

  console.log(props)

  useEffect(() => {
    if (props.user.user !== null) {
      if (following != null) {
        following.map(val => {
          axios.get(`/api/following-posts/${val}`).then(res => {
              if (res.data.length > 0) {
                postsToSee.push(res.data);
              }
              props.followingPosts(postsToSee); //setting posts unto redux
            })
            .catch(err =>
              console.log("Error getting posts of those who you follow")
            );
        });
      }
    }
  }, [following]);

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  // Display each post
  let { followingPosts } = props.posts;
  let {myPosts} = props.posts

  console.log(myPosts)
  
  
  let mappedPosts;
  if (followingPosts) {
    
    followingPosts = followingPosts.flat();
    let allPosts = followingPosts.concat(myPosts)
    
    allPosts.sort((a,b) => {
      return b.post_id - a.post_id
    })

    mappedPosts = allPosts.map(val => {
      return (
        <div className="post-card">
          <div className="post-user-info">
            <img src={val.profile_pic} alt='profile pic' />
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
