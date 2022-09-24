const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Post = require('./Models/Post');


const app = express();

const PORT = 3030;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/profile', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connection successful🍃'))
.catch(console.error)



app.get('/profile', async (req, res) => {
    try { 
        const posts = await Post.find();
        
        res.json(posts)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)  
    }
})

app.post('/profile', (req, res) =>{
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

  app.delete('/post/delete/:id', async (req, res) =>{
  try {
    const result = await Post.findByIdAndDelete(req.params.id)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})



app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT} 🚀`)
  })