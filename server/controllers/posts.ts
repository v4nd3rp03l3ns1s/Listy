const Post = require("../Models/Post");
import { Request, Response } from "express";


const posts = {
  addPost: async (req: Request, res: Response) => {
    try {
      const post = new Post({
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
        userId: req.body.userId,
        image: req.body.image.base64,
        likes: 0,
      });
      //TODO: add error handling
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deletePost: async (req: Request, res: Response) => {
    try {
      const result = await Post.findByIdAndDelete(req.params.id);
      res.status(204).json(result);
    } catch (error) {
      res.status(401).json(error);
    }
  },

  likeDislikePost: async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      let totalLikes = post.likes;
      const bool = req.body.upvote;
      if (bool) {
        totalLikes = post.likes + 1;
      }
      else {
        totalLikes = post.likes - 1;
      }
      await Post.findByIdAndUpdate(req.params.id, {likes: totalLikes});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getMainfeed: async (req: Request, res: Response) => {
    try {
      const userPosts = await Post.find({ userId: req.params.userId });
      res.json(userPosts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = posts;
