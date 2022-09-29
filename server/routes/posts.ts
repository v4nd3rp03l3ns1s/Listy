const router = require("express").Router();
const Post = require("../Models/Post");
const User = require("../Models/User");
const { checkJwt, checkJwt2 } = require("./middleware");
import { Request, Response } from "express";
import IUser from "../Models/IUser";

interface UserAuth extends Request {
  auth: {
    userId: string;
  };
  currUser: IUser;
}

//ADD A POST (with jwt, recognizes which user created the post)
router.post(
  "/",
  [checkJwt, checkJwt2],
  async (req: UserAuth, res: Response) => {
    // const userId = req.auth.payload.sub.split("|")[1]
    try {
      const post = new Post({
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
        userId: req.auth.userId,
        image: req.body.image.base64,
      });
      //TODO: add error handling
      await post.save();
      console.log(req.body);
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
);

//delete a post
router.delete("/post/delete/:id", async (req: UserAuth, res: Response) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//like and dislake  a post
router.put("/:id/like", async (req: UserAuth, res: Response) => {
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
});

//get a post
router.get("/:id", async (req: UserAuth, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/mainfeed/:userId", async (req: UserAuth, res: Response) => {
  try {
    const currUser = await User.findById({ _id: req.params.userId});
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
});

module.exports = router;
