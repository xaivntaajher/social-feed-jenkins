import React, { useState } from "react";
import "../PostList/PostList.css";

const Post = (props) => {
  const [likeButton, setLikeButton] = useState("inactive");
  const [dislikeButton, setDislikeButton] = useState("inactive");

  function handleClickLike() {
    if (likeButton === "inactive") {
      setLikeButton("active-like");
      setDislikeButton("inactive");
    } else {
      setLikeButton("inactive");
    }
  }

  function handleClickDislike() {
    if (dislikeButton === "inactive") {
      setDislikeButton("active-dislike");
      setLikeButton("inactive");
    } else {
      setDislikeButton("inactive");
    }
  }

  return (
    <div className="post">
      <div className="name">
        <p>{props.post.name}</p>
      </div>
      <div>
        <p>{props.post.post}</p>
      </div>
      <div className="date">
      <p>{props.post.date}</p>
    </div>
    <div className="click">
        <button type="button" className={likeButton} onClick={handleClickLike}>
        Like
        </button>
        <button type="button" className={dislikeButton} onClick={handleClickDislike}>
        Dislike
        </button>
    </div>
    </div>
  );
};

export default Post;
