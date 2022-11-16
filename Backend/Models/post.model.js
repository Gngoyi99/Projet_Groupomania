const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    picture: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          author: String,
          commenterId: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
