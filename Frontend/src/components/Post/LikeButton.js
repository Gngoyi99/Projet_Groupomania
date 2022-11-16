import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post.likers.includes(post.posterId)) setLiked(true);
  }, [post.posterId, post.likers, liked]);

  const like = (postId, _id) => {
    if ((postId = post._id)) {
      axios({
        method: "options",
        url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
        data: { id: post.posterId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(() => setLiked(true))
        .catch((err) => console.log(err));
    } else {
      console("erreur pas de like");
    }
  };

  const unlike = (postId, _id) => {
    if ((postId = post._id)) {
      axios({
        method: "options",
        url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
        data: { id: post.posterId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(() => setLiked(false))
        .catch((err) => console.log(err));
    } else {
      console("erreur pas de unlike");
    }
  };

  return (
    <div className="like-container">
      {liked == false && (
        <i className="fas fa-heart" onClick={like} alt="like"></i>
      )}
      {liked && (
        <i className="far fa-solid fa-heart" onClick={unlike} alt="unlike"></i>
      )}
    </div>
  );
};
export default LikeButton;
