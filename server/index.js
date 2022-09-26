const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Post = require('./Models/Post');
require('dotenv').config();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


const app = express();
app.use(cors());



// app.options("*", cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

const PORT = 3030;

app.use(express.json());

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

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3030',
  clientID: '6aFL4m1lJjcg6n26300PoGgjf8fExYZ1',
  issuerBaseURL: 'https://listy.us.auth0.com',
  secret: 'o6XnZn_6Fh2Y9pw2RC4s5ZcBZvpPJqjsc4xU3povXtI48gH24pOIio-31IoP6wJu'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router



app.get('/post', async (req, res) => {
    try { 
        const posts = await Post.find();
        
        res.json(posts)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)  
    }
})

app.post('/post', requiresAuth(), async (req, res) =>{
    try {
      const post = new Post({
        name: req.body.name,
        rating: req.body.rating,
        genre: req.body.genre,
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




  app.delete('/post/:id', async (req, res) =>{
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