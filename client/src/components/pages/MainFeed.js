import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Post } from '../Post'
// import { post } from '../../../../server/routes/users'

export const MainFeed = () => {

    // const [like, setLike] = useState()

    const [posts, setPosts] = useState([])

    useEffect(() =>{
        const fetchPosts = async () =>{

            const res = await axios.get('http://localhost:3030/api/posts/mainfeed/6331a553c4e7ef4784286754');
            setPosts(res.data);
            
            console.log(res)
        };

        fetchPosts();

    }, [])



  return (
    <div>MainFeed

        {/* {posts.map((allPosts) =>{

        })} */}
        <Post />

        <div className='posts-container'>
            {posts.map(post => (
                <div className='post-container' key={post._id}>
                    <p className='post-name'>{post.name}</p>
                    <p className='post-rating'>{post.rating}</p>
                    <p className='post-genre'>{post.genre}</p>
                    <div><img src={post.image} /></div>
                </div>
            ))}
        </div>
    </div>
  )
}
