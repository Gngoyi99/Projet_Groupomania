const mysqlconnexion = require("../db.mysql");
const postRoutes = require("../routes/post");
const user = require("../controllers/user");

exports.createPost = async (req, res, next) => {
  const post = {
    posterId: req.body.userId,
    message: req.body.message,
    comments: [],
    picture: req.body.picture,
  };
  try {
    const post = req.body;
    mysqlconnexion.query("INSERT INTO POST SET ?", post, (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log(post);
        console.log(results);
        res
          .json({
            message: "post crée",
          })
          .sort({ createAt: -1 }); ///à voir!!!!
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.readAllPost = (req, res, next) => {
  const post = {
    posterId: req.body.userId,
    message: req.body.message,
    comments: [],
    picture: req.body.picture,
  };
  try {
    mysqlconnexion.query("SELECT * FROM post", post, (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log(post);
        console.log(results);
        return res.json(post);
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.readOnePost = (req, res) => {
  try {
    const post = {
      id: req.params.id,
      posterId: req.body.userId,
      message: req.body.message,
      comments: [],
      picture: req.body.picture,
    };
    mysqlconnexion.query(
      "SELECT * FROM post WHERE id = (?)", //trouver la syntaxe indice I
      post.id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(results);
          return res.json(post);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updatePost = (req, res, next) => {
  try {
    const post = {
      id: req.params.id,
      posterId: req.body.userId,
      message: req.body.message,
      comments: [],
      picture: req.body.picture,
    };

    mysqlconnexion.query(
      "SELECT * FROM post WHERE id = (?)",
      post.id,

      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log(results);
          console.log("TOKEN");
          console.log(results[0].posterId);

          const postObject = req.body.message;
          console.log(postObject);
          const values = [postObject, post.id];
          console.log(values);
          mysqlconnexion.query(
            "UPDATE `post` SET `message` = (?) WHERE `id` = (?)",
            values,

            (error, results) => {
              if (error) {
                console.log(error);
                res.json({ error });
              } else {
                console.log(results);
                return res.json(post);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
//"UPDATE `post` SET `message` = (?) WHERE `id` = (?) ", //trouver la syntaxe modification

exports.deletePost = (req, res, next) => {
  try {
    const post = {
      id: req.params.id,
      posterId: req.body.userId,
      message: req.body.message,
      picture: req.body.picture,
    };
    mysqlconnexion.query(
      "DELETE FROM post WHERE id = (?)", //trouver la syntaxe supprimer
      post.id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(results);
          return res.json({ message: "Le post a été supprimé" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.commentPost = (req, res) => {
  try {
    const comment = {
      commenterId: req.body.commenterId,
      message: req.body.message,
      post_id: req.params.id,
    };
    mysqlconnexion.query(
      "INSERT INTO COMMENT SET ?",
      comment,
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log(results);
          console.log("TOKEN");
          console.log(comment);
          res.json({
            message: "commentaire crée",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateCommentPost = (req, res) => {
  try {
    const comment = {
      id: req.params.id,
      commenterId: req.body.commenterId,
      message: req.body.message,
    };

    mysqlconnexion.query(
      "SELECT * FROM comment WHERE id = (?)",
      comment.id,

      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log(results);
          console.log("TOKEN");
          console.log(results[0].commenterId);

          const commentObject = req.body.message;
          console.log(commentObject);
          const values = [commentObject, comment.id];
          console.log(values);
          mysqlconnexion.query(
            "UPDATE `comment` SET `message` = (?) WHERE `id` = (?)",
            values,

            (error, results) => {
              if (error) {
                console.log(error);
                res.json({ error });
              } else {
                console.log(results);
                return res.json(comment);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteCommentPost = (req, res) => {
  try {
    const comment = {
      id: req.params.id,
      commenterId: req.body.commenterId,
      message: req.body.message,
    };
    mysqlconnexion.query(
      "DELETE FROM post WHERE id = (?)", //trouver la syntaxe supprimer
      post.id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(results);
          return res.json({ message: "Le post a été supprimé" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.readAllCommentPost = (req, res) => {
  const comment = {
    commenterId: req.body.commenterId,
    message: req.body.message,
    post_id: req.params.id,
  };
  try {
    mysqlconnexion.query(
      "SELECT * FROM comment WHERE post_id = ? ",
      comment.post_id,
      (error, results) => {
        if (error) {
          console.log(error);
          res.json({ error });
        } else {
          console.log(comment);
          console.log(results);
          return res.json(comment);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
