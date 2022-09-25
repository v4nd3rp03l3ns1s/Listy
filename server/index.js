const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Post = require('./Models/Post');
require('dotenv').config();


const app = express();

const PORT = 3030;

app.use(express.json());
app.use(cors());

const atlasUri = process.env.ATLAS_URI

// mongoose.connect('mongodb://127.0.0.1:27017/profile', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Database connection successful🍃'))
// .catch(console.error)

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection =  mongoose.connection;
connection.once('open', () => console.log('Database connection successful🍃'))

// const postsRouter = require('./routes/posts')
// app.use('/profile', postsRouter)




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
        genre: req.body.genre,
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

//to update fix in frontend later?





app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT} 🚀`)
  })