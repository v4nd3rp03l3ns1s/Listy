const User = require("../Models/User");
import { Request, Response } from "express";
import IUser from "../Models/IUser";

interface UserAuth extends Request {
  auth: {
    userId: string;
  };
  currUser: IUser;
}

const users = {
  getUser: async (req: Request, res: Response) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      //take away what we dont want to see
      const { password, email, isAdmin, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  followUser: async (req: UserAuth, res: Response) => {
    if (req.auth.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.currUser;

        if (!user.followers.includes(req.auth.userId)) {
          await user.updateOne({ $push: { followers: req.auth.userId } });
          await currUser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json("user followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("you can not follow yourself");
    }
  },

  unfollowUser: async (req: UserAuth, res: Response) => {
    //if it is not the same user
    if (req.auth.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.currUser;

        if (user.followers.includes(req.auth.userId)) {
          await user.updateOne({ $pull: { followers: req.auth.userId } });
          await currUser.updateOne({ $pull: { following: req.params.id } });
          res.status(200).json("user unfollowed");
        } else {
          res.status(403).json("you do not follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      //if it is the same user
      res.status(403).json("you can not unfollow yourself");
    }
  },
};

module.exports = users;
