const Post = require("../Models/post.model");
const UserModel = require("../Models/user");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const console = require("console");
const { post } = require("../routes/user.routes");

module.exports.readPost = (req, res) => {
  Post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.getOnePost = (req, res) => {
  Post.findById({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.createPost = async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  const newPost = new Post({
    author: user.nom + " " + user.prenom,
    posterId: user._id,
    message: req.body.message,
    picture:
      req.file !== undefined
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : "",
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    const updatedRecord = {};
    if (req.body.message && req.body.message !== "null") {
      updatedRecord.message = req.body.message;
    }
    if (req.file) {
      updatedRecord.picture = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (error, docs) => {
        if (!error) {
          res.send(docs);
        } else {
          console.log("Update error : " + error);
        }
      }
    );
  }
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    Post.findById({ _id: req.params.id })
      .then(() => {
        Post.findByIdAndRemove({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.likePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,

      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ userId: req.body.id, message: "like confirmé" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(err);
  }
};

exports.unlikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    try {
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true }
      );
      return res
        .status(200)
        .send({ userId: req.body.id, message: "like retiré" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

module.exports.commentPost = async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            author: user.nom + " " + user.prenom,
            commenterId: user._id,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(405).send(err);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(401).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  try {
    Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
