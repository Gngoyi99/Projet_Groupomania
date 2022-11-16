const checkUser = require("../middleware/auth");
const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("../middleware/multer");
const admin = require("../middleware/admin");

router.get("/", checkUser, postController.readPost);
router.post("/", checkUser, multer, postController.createPost);
router.get("/:id", checkUser, postController.getOnePost);
router.put("/:id", [checkUser, admin], multer, postController.updatePost);
router.delete("/:id", [checkUser, admin], postController.deletePost);
router.options("/like-post/:id", postController.likePost);
router.options("/unlike-post/:id", postController.unlikePost);

// comments
router.patch("/comment-post/:id", checkUser, postController.commentPost);
router.patch(
  "/edit-comment-post/:id",
  checkUser,
  postController.editCommentPost
);
router.patch(
  "/delete-comment-post/:id",
  [checkUser, admin],
  postController.deleteCommentPost
);

module.exports = router;
