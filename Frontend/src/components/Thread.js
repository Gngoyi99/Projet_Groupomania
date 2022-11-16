import React, { useState } from "react";
import LikeButton from "./Post/LikeButton";
import Update from "./Post/Update";
import Comment from "./Post/Comment";

const Thread = ({ posts }) => {
  const [showComments, setShowComments] = useState(false);

  const renderPost = () => {
    return (
      <div>
        {posts.map((post) => {
          const posts = (
            <article key={post._id} className="card-container">
              <div className="card-right">
                <div className="card-header">
                  <div className="pseudo">
                    <h3> {post.author}</h3>
                  </div>
                  <span>{post.createdAt}</span>
                </div>
                <Update post={post} />
                {post.picture && (
                  <img src={post.picture} alt="card-pic" className="card-pic" />
                )}
                <div className="card-footer">
                  <div className="comment-icon">
                    <i
                      onClick={() => setShowComments(!showComments)}
                      className="far fa-comments"
                    ></i>
                    <span>{post.comments.length}</span>
                  </div>
                  <LikeButton post={post} />
                </div>
                {showComments && <Comment post={post} />}
              </div>
            </article>
          );
          return posts;
        })}
      </div>
    );
  };

  return (
    <div className="thread-container">
      <div>{renderPost()}</div>
    </div>
  );
};

export default Thread;
