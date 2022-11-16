import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from "./Delete";

const Update = ({ post, updatePost }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const userData = localStorage.getItem("user");
  const userAdmin = localStorage.getItem("isAdmin");

  const updateItem = (postId, message) => {
    if ((postId = post._id)) {
      return axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
        data: { message: textUpdate },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(
          (data) => setTextUpdate(data),
          setIsUpdated(false),
          window.location.reload("/")
        )
        .catch((err) => err);
    } else {
    }
    console.log(axios);
  };

  return (
    <div>
      {isUpdated === false && <p>{post.message}</p>}
      {isUpdated && (
        <div className="update-post">
          <textarea
            defaultValue={post.message}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <div className="button-container">
            <button className="btn" onClick={updateItem}>
              Valider la modification
            </button>
          </div>
        </div>
      )}
      {post.posterId === userData && (
        <div className="button-container">
          <div onClick={() => setIsUpdated(!isUpdated)}>
            <i className="fas fa-edit"></i>
          </div>
          <Delete post={post} />
        </div>
      )}
    </div>
  );
};
export default Update;
