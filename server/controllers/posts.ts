const Post = require("../Models/Post");
const User = require("../Models/User");
import { Request, Response } from "express";
import IUser from "../Models/IUser";

interface UserAuth extends Request {
  auth: {
    userId: string;
  };
  currUser: IUser;
}

const posts = {
  addPost: async (req: UserAuth, res: Response) => {
    // const userId = req.auth.payload.sub.split("|")[1]
    try {
      const post = new Post({
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
        userId: req.body.userId,
        image: req.body.image.base64,
      });
      //TODO: add error handling
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deletePost: async (req: UserAuth, res: Response) => {
    try {
      const result = await Post.findByIdAndDelete(req.params.id);
      res.status(204).json(result);
    } catch (error) {
      res.status(401).json(error);
    }
  },

  likeDislikePost: async (req: UserAuth, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getPost: async (req: UserAuth, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllPosts: async (req: UserAuth, res: Response) => {
    console.log("in");
    const posts = await Post.find({ userId: req.auth.userId });
    res.status(200).json(posts);
  },

  getMainfeed: async (req: UserAuth, res: Response) => {
    try {
      const currUser = await User.findById({ _id: req.params.userId });
      const userPosts = await Post.find({ userId: req.params.userId });
      const friendPosts = await Promise.all(
        currUser.following.map((friendId: string) => {
          //this will return each post
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts));
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = posts;
