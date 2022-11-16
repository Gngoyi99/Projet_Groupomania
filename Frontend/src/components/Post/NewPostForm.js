import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPostForm = ({ updatePost }) => {
  const nav = useNavigate();

  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [file, setFile] = useState("");

  const handlePost = async (data) => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("message", message);
      if (postPicture) data.append("image", file);

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            console.log(console.error);
          } else {
            axios({
              method: "get",
              url: `${process.env.REACT_APP_API_URL}api/post/`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              },
            })
              .then((res) => {
                updatePost();
              })
              .catch();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {});

  return (
    <div className="post-container">
      <>
        <div className="post-form">
          <textarea
            name="message"
            id="message"
            placeholder="Quoi de neuf ?"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {message || postPicture > 20 ? (
            <article className="card-container">
              <div className="card-right">
                <div className="card-header">
                  <div className="pseudo">
                    <h3></h3>
                  </div>
                  <span>{Date.now()}</span>
                </div>
                <p className="content">{message}</p>
                <img src={postPicture} alt="" />
              </div>
            </article>
          ) : null}
          <div className="footer-form">
            <div className="icon">
              <>
                <i className="far fa-solid fa-image">
                  <input
                    type="file"
                    id="file-upload"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />
                </i>
              </>
            </div>
            <div className="btn-send">
              {message || postPicture > 20 ? (
                <button className="cancel" onClick={cancelPost}>
                  Annuler
                </button>
              ) : null}

              <button className="send" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPostForm;
