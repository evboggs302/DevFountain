import React, { useState, useEffect } from "react";
import UseFetch from "../../usefetch";
import "./createpost.scss";
import { connect } from "react-redux";
import { setMyPosts } from "../../../dux/reducers/postsReducer";

function CreatePost(props) {
  const [input, setInput] = useState(null);
  const { data: data, postData: postData } = UseFetch("/api/post", true, null);

  function createPost(content) {
    if (content !== null) {
      console.log(content);
      postData({ content });
    }
  }

  useEffect(() => {
    if (data !== null) {
      console.log(data);
      props.setMyPosts(data);
    }
  }, [data]);

  function handleChange(e) {
    setInput(e);
  }

  console.log(props);

  return (
    <div className="create-post">
      <form>
        <input
          type="text"
          className="post-input"
          placeholder="What's on your mind?"
          name="post"
          onChange={e => handleChange(e.target.value)}
        />
        <input
          type="reset"
          value="Post"
          className="post-button"
          onClick={() => createPost(input)}
        />
      </form>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const myConnect = connect(
  mapPropsToState,
  { setMyPosts }
);

export default myConnect(CreatePost);
