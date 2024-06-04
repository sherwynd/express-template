const Blog = require("../models/blogModel");

// Function to get all blog posts
const getAllBlogs = async () => {
  return await Blog.find();
};

// Function to get a single blog post by ID
const getBlogById = async (id) => {
  return await Blog.findById(id);
  // console.log("This is Blog ", blod)
  // if (!blog) {
  //   throw new Error("Blog not found");
  // }
};

const getBlogByUserRefId = async (refId) => {
  const getUser = await Blog.findOne({
    creatorId: refId,
  });
  if (!getUser) throw new Error("User not found");
  return getUser;
};
// Function to create a new blog post
const createBlog = async (blogData, userId) => {
  const blog = new Blog(blogData);
  return await blog.save();
};

const createComment = async (id, commentData) => {
  const blog = await Blog.findById(id);

  const comment = {
    text: commentData.text,
    refId: commentData.refId,
  };

  blog.comments.push(comment);
  await blog.save();
  return blog;
};

// Function to update an existing blog post
const updateBlog = async (blogId, userId, updateData) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error("Blog not found");
  if (blog.creatorId !== userId) {
    throw new Error("Permission denied");
  }

  console.log(blogId, userId, updateData);

  // const updateData = {
  //     heading: blogData.heading,
  //     description: blogData.description,
  // };

  return await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
};

// Function to delete a blog post by ID
const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  if (blog.user.id.toString() !== userId) throw new Error("Permission denied");

  return await Blog.findByIdAndDelete(id);
};

const likePost = async (blogId, refId) => {
  const blog = await Blog.findById({ _id: blogId });
  if (!blog.likeRefId.includes(refId)) {
    blog.likeRefId.push(refId);
    await blog.save();
  }
  return blog;
};

const removeLike = async (blogId, refId) => {
  const blog = await Blog.findById({ _id: blogId });
  if (blog.likeRefId.includes(refId)) {
    blog.likeRefId = blog.likeRefId.filter((id) => id !== refId);
    await blog.save();
  }
  return blog;
};

const toggleLikePost = async (blogId, refId) => {
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) throw new Error("Blog post not found");

  if (blog.likeRefId.includes(refId)) {
    blog.likeRefId = blog.likeRefId.filter((id) => id !== refId); // Remove like
  } else {
    blog.likeRefId.push(refId); // Add like
  }

  await blog.save();
  return blog;
};

const mutePost = async (blogId, refId) => {
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) throw new Error("Blog post not found");

  if (!blog.muteBy.includes(refId)) {
    blog.muteBy.push(refId);
    await blog.save();
  }

  return blog;
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  likePost,
  removeLike,
  toggleLikePost,
  mutePost,
  getBlogByUserRefId,
};
