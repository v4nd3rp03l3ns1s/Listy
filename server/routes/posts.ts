const router = require("express").Router();
const posts = require('../controllers/posts.ts');
import { Request, Response } from "express"; 

router.post("/", (req: Request, res: Response) => {
  posts.addPost(req, res)
});

router.delete("/post/delete/:id", (req: Request, res: Response) => {
  posts.deletePost(req, res)
});

router.put("/like/:id", (req: Request, res: Response) => {
  posts.likeDislikePost(req, res)
});

router.get("/mainfeed/:userId", (req: Request, res: Response) => {
  posts.getMainfeed(req, res)
});


module.exports = router;
