const router = require('express').Router();
const Post = require('../Models/Post');
const User = require('../Models/User');
const { auth } = require('express-oauth2-jwt-bearer');
const { requiresAuth } = require('express-openid-connect');
const { expressjwt: jwt } = require("express-jwt");
const jwks = require('jwks-rsa')
const axios = require('axios');
const { checkJwt, checkJwt2 } = require('./middleware')



router.post('/', [checkJwt, checkJwt2],  async (req, res) =>{
  // const userId = req.auth.payload.sub.split("|")[1]
  try {
    const post = new Post({
      name: req.body.name,
      rating: req.body.rating,
      genre: req.body.genre,
      userId: req.auth.userId,
    });
    //TODO: add error handling
    await post.save();
    console.log(req.body)
    res.status(201).json(post);
  } catch (error) {
    console.log(error)
    res.sendStatus(400);
  }
})


// router.post('/', verifyJwt, requiresAuth(), async (req, res) =>{
//   const userId = req.auth.payload.sub.split("|")[1]
//   try {
//     const post = new Post({
//       name: req.body.name,
//       rating: req.body.rating,
//       genre: req.body.genre,
//       userId: userId,
//     });
//     //TODO: add error handling
//     await post.save();
//     console.log(req.body)
//     res.status(201).json(post);
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(400);
//   }
// })

// try {
  //       const post = new Post({
          // name: req.body.name,
          // rating: req.body.rating,
          // genre: req.body.genre
  //       });
  //       post.save();
  //       console.log(req.body)
  //       res.status(201).json(post);
  //     } catch (error) {
  //       console.log(error)
  //       res.sendStatus(400);
  //     }

//update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.updateOne({$set: req.body});
      res.status(200).json('The post has been updated')
    } else {
      res.status(403).json('You can only update your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.deleteOne();
      res.status(200).json('The post has been deleted')
    } else {
      res.status(403).json('You can only delete your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//like and dislake  a post
router.put('/:id/like', async (req, res) =>{
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)){
      await post.updateOne({ $push: {likes: req.body.userId}});
      res.status(200).json('The post has been liked')
    } else{
      await post.updateOne({ $pull: {likes: req.body.userId}});
      res.status(200).json('The post has been disliked')
    }
  } catch (error) {
      res.status(500).json(error)
  }
})

//get a post
router.get('/:id', async (req, res) =>{
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get main feed posts - call all foloowing  of the user and all their posts
router.get('/mainfeed/:userId', async (req, res) =>{
  try {
    const currUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId: currUser._id});
    const friendPosts = await Promise.all(
      currUser.following.map((friendId) =>{
        //this will return each post
        return Post.find({ userId: friendId});
      })
    )
    res.json(userPosts.concat(...friendPosts))
    
  } catch (error) {
    res.status(500).json(error)
  }

})

//get users all post 
router.get('/profile/:username', async (req, res) =>{
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }

})

// router.get('/profile', async (req, res) => {
//     try { 
//         const posts = await Post.find();
        
//         res.json(posts)
        
//     } catch (error) {
//         console.log(error)
//         res.sendStatus(400)  
//     }
// })

// router.post('/profile', (req, res) =>{
//     try {
//       const post = new Post({
//         name: req.body.name,
//         rating: req.body.rating,
//         genre: req.body.genre
//       });
//       post.save();
//       console.log(req.body)
//       res.status(201).json(post);
//     } catch (error) {
//       console.log(error)
//       res.sendStatus(400);
//     }
//   })

//   router.delete('/post/delete/:id', async (req, res) =>{
//   try {
//     const result = await Post.findByIdAndDelete(req.params.id)
//     res.json(result)
//   } catch (error) {
//     console.log(error)
//   }
// })

module.exports = router;