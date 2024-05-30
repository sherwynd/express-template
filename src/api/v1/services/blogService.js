const Blog = require("../models/blogModel");

// Function to get all blog posts
const getAllBlogs = async () => {
    return await Blog.find();
};

// Function to get a single blog post by ID
const getBlogById = async (id) => {
    
};

// Function to create a new blog post
const createBlog = async (blogData, userId) => {
    const blog = new Blog(blogData);
    return await blog.save();
};

// Function to update an existing blog post
const updateBlog = async (id, userId, blogData) => {
    const blog = await Blog.findById(id);
    if (!blog) throw new Error("Blog not found");
    if (blog.user.id.toString() !== userId) throw new Error("Permission denied");

    const updateData = {
        heading: blogData.heading,
        description: blogData.description,
    };
    
    return await Blog.findByIdAndUpdate(id, updateData, { new: true });
};

// Function to delete a blog post by ID
const deleteBlog = async (id, userId) => {
    const blog = await Blog.findById(id);
    if (!blog) throw new Error("Blog not found");
    if (blog.user.id.toString() !== userId) throw new Error("Permission denied");
  
    return await Blog.findByIdAndDelete(id);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
