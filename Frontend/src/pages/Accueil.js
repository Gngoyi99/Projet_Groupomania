import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Accueil = () => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const nav = useNavigate();
  const updatePost = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      //.then((data) => console.log(data.data))
      .then((data) => setPosts(data.data))

      .catch(() => nav("/profil"));
  };

  useEffect(() => {
    updatePost();
  }, [0]);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {<NewPostForm updatePost={updatePost} />}
        </div>
        <Thread posts={posts} />
      </div>
    </div>
  );
};

export default Accueil;
