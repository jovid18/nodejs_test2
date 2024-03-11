const express = require('express');
const { Posts } = require('../models/index.js');
const router = express.Router();

const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newPost = await Posts.create({
      data: {
        title,
        content,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  /** (구현) **/
  try {
    const posts = await Posts.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  /** (구현) **/
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Posts.findFirst({
      where: { id: +postId },
    });
    if (!post) {
      res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
    const result = await Posts.update({
      data: { title, content },
      where: { id: +postId },
      select: { id: true, title: true, content: true },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePostById = async (req, res) => {
  /** (구현) **/
  try {
    const { postId } = req.params;
    const post = await Posts.findFirst({ where: { id: +postId } });
    if (!post) {
      res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }
    await Posts.delete({ where: { id: +postId } });
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;
