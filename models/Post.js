const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    discription: {
      type: String,
      required: [true, 'Discription is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
    },
    tag: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('blogpost', postSchema);
