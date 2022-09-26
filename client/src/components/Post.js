import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const Post = ({post}) => {

    const [like, setLike] = useState()
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})

    // useEffect(() =>{
    //     const fetchUser = async () =>{

    //         const res = await axios.get(`http://localhost:3030/api/auth/users/${post.userId}`);
    //         setPosts(res.data);
            
    //         console.log(res)
    //     };

    //     fetchPosts();



    // }, [])


    const likeHandler = () => {
        setLike(isLiked ? like -1 : like + 1);
        setIsLiked(!isLiked)
    }

  return (
    <div>Post</div>
  )
}
