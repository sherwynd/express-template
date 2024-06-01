const Blog = require("../models/blogModel");
const blogService = require("../services/blogService");
const User = require("../models/auth/userModel");
const mongoose = require("mongoose");

// GET all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogService.getBlogById(id);
        if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new blog
const createBlog = async (req, res) => {
    const { heading, description, comments, favouriteCount, creatorId } = req.body;
    const images = req.files.map(file => `uploads/${file.filename}`);

    try {
        const blog = await Blog.create({
            heading,
            description,
            images,
            comments,
            favouriteCount,
            creatorId
        })
        res.status(200).json(blog);
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
            return res.status(403).json({ message: "You do not have permission to edit this blog" });
        }

        // Allow only heading and description to be updated
        const updateData = {
            heading: req.body.heading,
            description: req.body.description,
        };

        // Proceed with the update if the user is the owner
        const updatedBlog = await blogService.updateBlog(blogId,refId, updateData);
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
        const blog = await Blog.findOneAndDelete({_id: id})
        if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
 };
