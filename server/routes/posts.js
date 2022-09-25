const express = require('express');
const router = express.Router();
const Post = require('../Models/Post');

router.get('/profile', async (req, res) => {
    try { 
        const posts = await Post.find();
        
        res.json(posts)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)  
    }
})

router.post('/profile', (req, res) =>{
    try {
      const post = new Post({
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre
      });
      post.save();
      console.log(req.body)
      res.status(201).json(post);
    } catch (error) {
      console.log(error)
      res.sendStatus(400);
    }
  })

  router.delete('/post/delete/:id', async (req, res) =>{
  try {
    const result = await Post.findByIdAndDelete(req.params.id)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;