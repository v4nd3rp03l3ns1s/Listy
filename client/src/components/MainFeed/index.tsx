import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { IPost } from '../componentTypes';
import { fetchMainfeedPosts } from '../../ApiServices';


export const MainFeed = () => {
  const { user } = useAuth0();
  const [posts, setPosts] = useState<IPost[]>([])

  //HAVE TO MAKE THIS DYNAMIC
  useEffect(() => {
    async function getFeedPosts() {
      if (user?.sub) {
      const feedPosts = await fetchMainfeedPosts(user.sub);
      setPosts(feedPosts);
    }};
      getFeedPosts();
    }, [user])

    return (
        <main>
            <h1 className='mainfeed-title'>MainFeed</h1>

            <section className='posts-container'>
                { posts && posts.map(post => (
                    <div className='image-and-post' key={post._id}>
                        <img className='post-image' src={post.image} />
                        <section className='post-container'>
                            <h1 className='post-name'>{post.name}</h1>
                            <p className='post-rating'>{post.rating}</p>
                            <p className='post-genre'>{post.genre}</p>
                        </section>
                    </div>
                ))}
            </section>
        </main>
    )
}
