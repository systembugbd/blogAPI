const express = require('express');
const router = express.Router();
const {
  createPostController,
  getAllPostController,
  dropDBDev,
  getPostByPostId,
  patchPostData,
  deletePostById,
} = require('../controller/Post');

router.route('/').get(getAllPostController).post(createPostController);

router
  .route('/:postId')
  .get(getPostByPostId)
  .patch(patchPostData)
  .delete(deletePostById);

/*
 !Drop DB for Development only before production will be commented
*/
router.route('/drop').post(dropDBDev);

module.exports = router;
