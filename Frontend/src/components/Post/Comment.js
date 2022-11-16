import React, { useState } from "react";
import axios from "axios";
import EditDeleteComment from "./EditDeleteComment";

const Comment = ({ post, comment }) => {
  const [text, setText] = useState("");
  const [postState, setPostState] = useState(post);
  const [comments, setComments] = useState(post.comments);
  const userData = localStorage.getItem("user");
  const userAdmin = localStorage.getItem("isAdmin");

  const handleComment = async (e, postId) => {
    e.preventDefault();

    postId = post._id;

    await axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + postId,
      data: { postId, text },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((data) => setText(data))
      .then(() => setText(""))
      .catch((err) => console.log(err));

    callback2({ ...comment, text });
  };

  const callback = (comment) => {
    //commentaire : mettre a jour comment avec le nouveau commentaire
    // const updatedComment = { id: comment.id, text: text };

    //const index = comments.findIndex((c) => c.id == updatedComment.id);

    //comments[index] = updatedComment;

    // setComments(comments);
    //console.log(comments);
    //console.log(comment);

    const newState = comments.map((obj) => {
      if (obj._id === comment._id) {
        return { ...obj, text: comment.text };
      }

      return obj;
    });

    setComments(newState);
    console.log(newState);
  };

  const callback2 = (comment) => {
    const newState = post.comments;
    const author = comment.author;
    comments.push({
      ...comment,
      author: "'Nouveau commentaire'",
      text,
    }); ///attendre avant de publier que la requete s'envoie
    console.log(comment);
    console.log(newState);
  };

  const callback3 = (comment) => {
    const newState = comments.map((obj) => {
      if (obj._id === comment._id) {
        return { text: "Commentaire supprimé" };
      }

      return obj;
    });

    setComments(newState);
    console.log(newState);
  };

  return (
    <div className="comments-containers">
      {comments.map((comment, i) => {
        return (
          <div
            className={
              comment.commenterId === userData
                ? "comment-container client"
                : "comment-container client"
            }
            key={(comment._id, i)}
          >
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.author}</h3>
                </div>
                <span>{Date.now()}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment
                callback={callback}
                callback3={callback3}
                comment={comment}
                post={postState}
              />
            </div>
          </div>
        );
      })}

      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laisser un commentaire"
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};
export default Comment;
