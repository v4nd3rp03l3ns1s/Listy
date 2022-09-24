import React, { useState, useEffect } from 'react'
import './Add.css'



const baseUrl = 'http://localhost:3030'

export const Add = () => {



    const [posts, setPosts] = useState([])

    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [genre, setGenre] = useState('')
    const [popupActive, setPopupActive] = useState(false);


    useEffect(() =>{
      GetPosts();
    }, [])
  
    const GetPosts = () =>{
      fetch(baseUrl + '/profile')
      .then(result => result.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error: ', err))
    }

    const onSubmit = (e) =>{

        e.preventDefault();

        onPostAdded({
            name,
            rating,
            genre
        });

        setName('')
        setRating('')
        setGenre('')
    }

    const onPostAdded = async (obj) =>{
        console.log(obj)
        const data = await fetch(baseUrl + '/profile', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name: obj.name,
                rating: obj.rating,
                genre: obj.genre
            })
        })
        const res = await data.json();
        setPosts([...posts, res])
    }






  return (
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
       
        <div className='addPopup' onClick={() => setPopupActive(true)}><img className='add-logo' src='https://icons.veryicon.com/png/o/object/material-design-icons/add-49.png'/></div>

        {popupActive ? (
            <div className='popup'>
                <div className='modal-content'>
                <button className='close-modal' onClick={() => setPopupActive(false)}>CLOSE</button>

                <form onSubmit={onSubmit}>
                    <div className='all-inputs'>

                         <div className='upload-div' >
                            <input type='file' id='file' accept='image/*' />
                            <label className='upload' htmlFor='file'>
                                <i className='material-icons'>add_photo_alternate</i> &nbsp;
                                Select Photo
                                </label>
                        </div>

                        <div className='name-input-div'>
                            <label>Name</label>
                            <input required className='add-post-input' name='name' type='text' placeholder='name' onChange={e => setName(e.target.value)} value={name}/>
                        </div>

                        <div className='rating-input-div'>
                            <label>Rating</label>
                            <input required className='add-post-input' name='rating' type='text' placeholder='rating' onChange={e => setRating(e.target.value)} value={rating}/>
                        </div>
                     
                        <div className='genre-input-div'>
                            <label>Genre</label>
                            <input required className='add-post-input' name='genre' type='text' placeholder='genre'  onChange={e => setGenre(e.target.value)} value={genre} />
                        </div>

                    </div>
                {/* <button className='close-modal' onClick={toggle}>CLOSE</button> */}
                <button className='post-modal'>POST</button>
                </form>


                </div>
                

            </div>

        ) : ''}

        <div className='posts-container'>
            {posts.map(post => (
                <div className='post-container' key={post._id}>
                    <p className='post-name'>{post.name}</p>
                    <p className='post-rating'>{post.rating}</p>
                    <p className='post-genre'>{post.genre}</p>
                </div>
            ))}
        </div>

    </div>
  )
}
