import { useState, useEffect, FormEvent, FunctionComponent } from 'react'
import './Add.css';
// import { useAuth0 } from '@auth0/auth0-react'
import { IPost } from '../componentTypes';
import { createPost, fetchMainfeedPosts, deletePost, likePost } from '../../ApiServices';
import { useAuth0 } from '@auth0/auth0-react';

const FileBase64 = require('react-file-base64')

interface IProps {
  getAccessTokenSilently: Function,
  getAccessTokenWithPopup: Function,
 }

export const Add: FunctionComponent<IProps>  = ({getAccessTokenSilently, getAccessTokenWithPopup}) => {

  const { user } = useAuth0();

  const [posts, setPosts] = useState<IPost[]>([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [genre, setGenre] = useState('')
  const [image, setImage] = useState('')
  const [vote, setVote] = useState('')
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    async function getFeedPosts() {
      if (user?.sub) {
      const feedPosts = await fetchMainfeedPosts(user.sub);
      setPosts(feedPosts);
    }};
      getFeedPosts();
    }, [user])


  const onSubmit = async (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toBeSubmittedPost = {
      name,
      rating,
      genre,
      image,
      userId: user?.sub,
    }

    const res = await createPost(toBeSubmittedPost);
    // TODO: add error handling
    setPosts([...posts, res])

    //clears out the fields after post
    setName('');
    setRating('');
    setGenre('');
    setImage('');
  };

  const removePost = async (id? :string) => {
    await deletePost(id);
    setPosts(posts => posts.filter(post => post._id !== id))
  }

  const votePost = async (upvote: string, id?: string) => {
    if (id) await likePost(id, upvote);
  }

  return (
    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"></link>
      <div data-testid ='addPop' className='addPopup' onClick={() => setPopupActive(true)}><img className='add-logo' src='https://icons.veryicon.com/png/o/object/material-design-icons/add-49.png' /></div>
      {popupActive ? (
        <div className='popup'>
          <div className='modal-content'>
            <button data-testid= 'removePop' className='close-modal' onClick={() => setPopupActive(false)}>CLOSE</button>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
              <div className='all-inputs'>
                <div className='upload'>
                  <i className='material-icons'>add_photo_alternate</i>
                </div>
                <div className='name-input-div'>
                  <label>Name</label>
                  <input required className='add-post-input' name='name' type='text' placeholder='movie/tv-show name' onChange={e => setName(e.target.value)} value={name} />
                </div>
                <div className='rating-input-div'>
                  <label>Rating</label>
                  <input required className='add-post-input' name='rating' type='text' placeholder='rating' onChange={e => setRating(e.target.value)} value={rating} />
                </div>
                <div className='genre-input-div'>
                  <label>Genre</label>
                  <input required className='add-post-input' name='genre' type='text' placeholder='genre' onChange={e => setGenre(e.target.value)} value={genre} />
                </div>
              </div>
              <button className='post-modal'>POST</button>
            </form>
          </div>
        </div>
      ) : ''}
      <section className='posts-container'>
        {posts.map(post => (
          <div className='image-and-post' key={post._id}>
            <img className='post-image' src={post.image} />
            <section className='post-container'>
              <h1 className='post-name'>{post.name}</h1>
              <p className='post-rating'>{post.rating}</p>
              <p className='post-genre'>{post.genre}</p>
              <button className='delete-button' onClick={() => removePost(post._id)}>X</button>
            </section>
            <button className='like-button' onClick={() => votePost('true', post._id)}>Like!</button>
            <button className='dislike-button' onClick={() => votePost('false', post._id)}>Dislike!</button>
          </div>
        ))}
      </section>
    </div>
  )
}
