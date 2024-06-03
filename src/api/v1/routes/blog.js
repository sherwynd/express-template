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
  //hideBlog,
} = require("../controllers/blogController");

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", upload.array("images", 5), createBlog);
router.patch("/blogs/:refId/:blogId", updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.post("/comments/:id", createComment);

module.exports = router;
