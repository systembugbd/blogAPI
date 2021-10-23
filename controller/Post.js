const mongoose = require('mongoose');
const blogpost = require('../models/Post');
const asyncWrapper = require('../middleware/asyncWrapper');
const { customError } = require('../error/customeError');
const shortid = require('shortid');

/**
 * * NAME: createPostController
 * ?Create Post data to mongodb using mongoose
 * @METHOD POST, Post blogpost model data to mongodb
 * @route /api/v1/blog
 * @received json data from req.body
 * @return stored data with success msg
 */
const createPostController = asyncWrapper(async (req, res, next) => {
  const title = req.body.title;
  const discription = req.body.discription;
  const author = req.body.author;
  const image = req.body.image;
  const slug = req.body.slug
    ? req.body.slug
    : title.replace(/ /g, '-').toLowerCase();
  const category = req.body.category ? req.body.category : '';
  const tag = req.body.tag ? req.body.tag : '';
  const userId = req.body.userId ? req.body.userId : shortid.generate();
  let postdata = {
    title,
    discription,
    image,
    author,
    slug,
    category,
    tag,
    userId,
  };

  const saved = await blogpost.create(postdata);

  if (saved) {
    res
      .status(201)
      .json({ message: 'Post created Successfully ', newpost: saved });
  } else {
    return next(customError(`Error creating post`, '500'));
  }
});

/**
 * * NAME: getAllPostController
 * ?Get Post all data from mongodb using mongoose or as per Query string for userId.
 * @METHOD GET, to get blogpost model data from mongodb
 * @route /api/v1/blog or /api/v1/blog?userid=123456
 * @received json data from Mongodb
 * @return stored data if get by id
 */
const getAllPostController = asyncWrapper(async (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    const paramUserId = req.query.userId;

    const postByuserId = await blogpost.find({ userId: paramUserId });
    if (postByuserId.length == 0) {
      return next(
        customError(`Data not found with the user ID:${paramUserId}`, 404)
      );
    }

    res.status(200).json(postByuserId);
  } else {
    const allPost = await blogpost.find();
    res.status(200).json(allPost);
  }
});

/**
 * * NAME: getPostByPostId
 * ?Get Post data from mongodb using mongoose as per params post ID
 * @METHOD GET, to get blogpost model data from mongodb
 * @route /api/v1/blog/postId
 * @received json data from Mongodb
 * @return stored data if get by id
 */
const getPostByPostId = asyncWrapper(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await blogpost.findById(postId);
  if (!post)
    return next(
      customError(
        `Post not found with the ID: ${postId}, please try with another ID`,
        404
      )
    );

  res.status(200).json(post);
});

/**
 * * NAME: patchPostData
 * ?Patch Post data to mongodb using mongoose as per params post ID
 * @METHOD PATCH, to update blogpost model data to mongodb
 * @route /api/v1/blog/postId
 * @received json data from req.body
 * @return stored data
 */
const patchPostData = asyncWrapper(async (req, res, next) => {
  const postId = req.params.postId;

  const slug = req.body.slug
    ? req.body.slug
    : req.body.title.replace(/ /g, '-').toLowerCase();

  let postdata = { ...req.body, slug };

  // console.log(postId);
  const existsPost = await blogpost.findById(postId);

  if (!existsPost) {
    return next(customError(`Post not found with the give ID: ${postId}`, 404));
  }
  // console.log('I am found blog');
  const postUpdated = await blogpost.findOneAndUpdate(
    { _id: postId },
    postdata
  );

  const updatedPost = await blogpost.findById(postId);

  if (postUpdated) {
    res.status(201).json({ msg: 'Successfully post updated,', updatedPost });
  }
});

const deletePostById = asyncWrapper(async (req, res, next) => {
  const postId = req.params.postId;

  const existsPost = await blogpost.findById(postId);
  if (!existsPost) {
    return next(customError(`Post not found with the give ID: ${postId}`, 404));
  }

  const deletedPost = await blogpost.findOneAndDelete(postId);

  if (deletedPost) {
    res
      .status(201)
      .json({ msg: '1 Post Successfully deleted,', deleted_Post: deletedPost });
  }
});

/**
 * * NAME: dropDBDev
 * ?Drop Database for Development help
 * @METHOD POST, Post to drop Database
 * @route /api/v1/drop
 * @return stored data with success msg
 */
const dropDBDev = asyncWrapper(async (req, res, next) => {
  const db = await mongoose.connection;

  let dropDB = await db.dropDatabase('blogAPI');
  // let dropDB = '';
  if (dropDB) {
    res.status(200).json({ msg: 'Database Droped' });
  } else {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = {
  getAllPostController,
  getPostByPostId,
  createPostController,
  patchPostData,
  deletePostById,
  /**
   * ! Droping database using below function - dropDBDev
   */
  dropDBDev,
};
