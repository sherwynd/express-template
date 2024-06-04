const express = require("express");
const upload = require("../uploadConfig/index");
const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  createComment,
  toggleLikePost,
  mutePost,
  //hideBlog,
  getBlogByUserRefId,
} = require("../controllers/blogController");

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", upload.array("images", 5), createBlog);
router.patch("/blogs/:refId/:blogId", updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.post("/comments/:id", createComment);
router.patch("/like/:blogId/:refId", toggleLikePost);
router.patch("/mute/:blogId/:refId", mutePost);
router.get("/blogsHistory/:refId", getBlogByUserRefId);

module.exports = router;
