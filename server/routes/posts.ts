const router = require("express").Router();
const { checkJwt, checkJwt2 } = require("./middleware");
const posts = require('../controllers/posts.ts');
import { Request, Response } from "express";


//[checkJwt, checkJwt2], 

router.post("/", (req: Request, res: Response) => {
  posts.addPost(req, res)
});

router.delete("/post/delete/:id", (req: Request, res: Response) => {
  posts.deletePost(req, res)
});

router.put("/:id/like", (req: Request, res: Response) => {
  posts.likeDislikePost(req, res)
});

router.get("/allposts", [checkJwt, checkJwt2], (req: Request, res: Response) => {
  posts.getAllPosts(req, res)
});

router.get("/:id", (req: Request, res: Response) => {
  posts.getPost(req, res)
});

router.get("/mainfeed/:userId", (req: Request, res: Response) => {
  posts.getMainfeed(req, res)
});


module.exports = router;
