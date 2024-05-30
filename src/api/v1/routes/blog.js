const express = require("express");
const upload = require('../uploadConfig/index');
const router = express.Router();

const {
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    //hideBlog,
} = require("../controllers/blogController");

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", upload.array('images', 5), createBlog);
router.patch("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
