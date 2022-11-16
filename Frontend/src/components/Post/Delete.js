import React, { useState, useEffect } from "react";
import axios from "axios";

const Delete = ({ post }) => {
  const deleteQuote = (postId) => {
    if ((postId = post._id)) {
      return axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(window.location.reload("/"))
        .catch((err) => err);
    } else {
    }
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </div>
  );
};
export default Delete;
