import React, { useState } from "react";
import PostList from "./Components/PostList/PostList";
import CreatePostForm from "./Components/CreatePostForm/CreatePostForm";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([{ name: "Vegeta", post: "His power level is over 10,000!" }]);

  function addNewPost(entry) {
    let tempPost = [...entries, entry];

    setEntries(tempPost);
  }

  return (
    <div>
      <NavBar />
      <CreatePostForm addNewPostProperty={addNewPost} />
      <PostList parentEntries={entries} />
    </div>
  );
}

export default App;
