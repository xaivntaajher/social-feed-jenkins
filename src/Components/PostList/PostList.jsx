import React, { useState } from "react";
import "../PostList/PostList.css";
import Post from "../Post/Post";

const PostList = (props) => {
  
  return (
    <section className="postcontainer">
      {props.parentEntries.map((post) => {
        return (
          <Post key={post.id} post={post}/>
        );
      })}
    </section>
  );
};

export default PostList;
