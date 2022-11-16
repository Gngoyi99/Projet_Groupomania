import React, { useEffect, useState } from "react";
import axios from "axios";

const EditDeleteComment = ({ comment, post, callback, callback3 }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userData = localStorage.getItem("user");
  const userAdmin = localStorage.getItem("isAdmin");

  const handleEdit = async (e, postId, commentId) => {
    e.preventDefault();

    postId = post._id;
    commentId = comment._id;
    await axios({
      method: "PATCH",
      url:
        `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/` + postId,
      data: { text, commentId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((data) => setText(data))
      .then(() => setText(""))
      .catch((err) => console.log(err));
    setEdit(false);

    callback({
      ...comment,
      text,
    });
  };

  const handleDelete = async (e, postId, commentId) => {
    postId = post._id;
    commentId = comment._id;
    await axios({
      method: "PATCH",
      url:
        `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/` +
        postId,
      data: { commentId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    callback3({ ...comment });

    delete post.comment;
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (comment.commenterId === userData) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <i className="fas fa-wrench"></i>
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <i className="fas fa-trash-alt" />
            </span>
            <input type="submit" value="valider" />
          </div>
        </form>
      )}
    </div>
  );
};
export default EditDeleteComment;
