const Blog = require("../models/blogModel");
const blogService = require("../services/blogService");
const User = require("../models/auth/userModel");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// GET all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("this is my ID: ", id);
    // console.log(`Received ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId");

      res.status(404).json({ error: "Test Blog not found" });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogByUserRefId = async (req, res) => {
  try {
    const { refId } = req.params;
    if (!refId) {
      return res.status(404).json({ message: "refId not found" });
    }
    const blogHistory = await blogService.getBlogByUserRefId(refId);
    if (!blogHistory) {
      return res.status(404).json({ message: "Blog History not found" });
    }
    res.status(200).json(blogHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new blog
const createBlog = async (req, res) => {
  const { heading, description, comments, favouriteCount, creatorId } =
    req.body;
  const images = req.files.map((file) => `uploads/${file.filename}`);

  try {
    const blog = await Blog.create({
      heading,
      description,
      images,
      comments,
      favouriteCount,
      creatorId,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body.formData;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = user.username;

    const comment = { text, username, refId: uuidv4() };
    blog.comments.push(comment);
    const result = await Blog.findById(id);
    await blog.save();

    res.status(201).json(result.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE an existing blog
const updateBlog = async (req, res) => {
  try {
    const { refId, blogId } = req.params;

    // Fetch the blog to check ownership
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the owner of the blog
    if (blog.creatorId !== refId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this blog" });
    }

    // Allow only heading and description to be updated
    const updateData = {
      heading: req.body.heading,
      description: req.body.description,
    };

    // Proceed with the update if the user is the owner
    const updatedBlog = await blogService.updateBlog(blogId, refId, updateData);
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // const blog = await blogService.deleteBlog(id);
    const blog = await Blog.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const { blogId, refId } = req.params;

    const blog = await blogService.toggleLikePost(blogId, refId);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const mutePost = async (req, res) => {
  try {
    const { blogId, refId } = req.params;

    const blog = await blogService.mutePost(blogId, refId);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  toggleLikePost,
  mutePost,
  getBlogByUserRefId,
};
