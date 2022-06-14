const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", auth, postCtrl.createPost);

router.get("/", auth, postCtrl.readAllPost);

router.get("/:id", auth, postCtrl.readOnePost);

router.put("/:id", auth, postCtrl.updatePost);

router.delete("/:id", auth, postCtrl.deletePost);

//commentaire
router.patch("/comment-All-post/:id", auth, postCtrl.readAllCommentPost);

router.patch("/comment-post/:id", auth, postCtrl.commentPost);

router.patch("/update-post/:id", auth, postCtrl.updateCommentPost);

router.patch("/delete-comment-post/:id", auth, postCtrl.deleteCommentPost);

module.exports = router;
