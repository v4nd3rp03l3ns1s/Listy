import React, { useState, useEffect } from 'react'
import './Add.css'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import { useAuth0 } from '@auth0/auth0-react'



const baseUrl = 'http://localhost:3030'

export const Add = ({username}) => {

    const { getAccessTokenSilently,getAccessTokenWithPopup } = useAuth0();


    // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    
    
    
    const [posts, setPosts] = useState([])
    
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [genre, setGenre] = useState('')
    const [image, setImage] = useState('')
    const [popupActive, setPopupActive] = useState(false);
    
    
    useEffect(() =>{

        // const fetchUserPosts = async () =>{
        //     await axios.get('http://localhost:3030/api/posts/profile/milita')
        // }
        axios
        // .get('http://localhost:3030/api/posts/mainfeed/63317780c467d34c8d8d205c')
        .get('http://localhost:3030/api/posts/profile/milita')
        .then(result => setPosts(result.data))
        .catch(err => console.error('Error: ', err))
        // fetchUserPosts();
    }, [])
    
    
    const onSubmit = (e) =>{
        
        e.preventDefault();
        
        onPostAdded({
            name,
            rating,
            genre,
            image
        });
        
        
        setName('')
        setRating('')
        setGenre('')
        setImage('')
        
        
        
        //for the file upload?? - try and come here if does not work
        // axios
        //     .post('/profile', formData)
        //     .then((res) => setPosts(res.data))
        //     .catch((err) => {
            //         console.log(err)
            //     });
        }
        
        
        
        
    //     const onPostAdded = async (obj) =>{

            

    //         // const accessToken = await getAccessTokenSilently({
    //         //     audience: "http://localhost:3030",
    //         //     scope: "read:current_user",
    //         //   });

        

    //         console.log(obj)
    //         const data = await fetch('http://localhost:3030/api/posts', {
    //             method: 'POST',
    //             headers: {'Content-type': 'application/json', /*Authorization: `Bearer ${accessToken}`*/},
    //             body: JSON.stringify({
    //                 name: obj.name,
    //                 rating: obj.rating,
    //                 genre: obj.genre,
    //                 // image: obj.image

    //         })
    //     })
    //     // const data = await axios.post('http://localhost:3030/api/posts/')
    //     // TODO: add error handling
    //     const res = await data.json();
    //     setPosts([...posts, res])
    // }

    const onPostAdded = async (obj) => {
        let accessToken = ""
        const opts = {
            audience: "http://localhost:3030",
            scope: 'write:posts openid',
        }
        try {
            accessToken = await getAccessTokenSilently(opts);
        } catch(e) {
            console.warn("consent required as we are running in localhost. Using workaround https://github.com/auth0/auth0-react/issues/65")
            accessToken = await getAccessTokenWithPopup(opts)
        }
        const data = await fetch('/api/posts', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            headers: {'Content-type': 'application/json', Authorization: `Bearer ${accessToken}`,},
            body: JSON.stringify({
                name: obj.name,
                rating: obj.rating,
                genre: obj.genre,
                image: obj.image
            })
        })
        // TODO: add error handling
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

                <form onSubmit={onSubmit} encType='multipart/form-data'>
                    <div className='all-inputs'>

                         {/* <div className='upload-div' >
                            <label className='upload' htmlFor='file'>
                                <i className='material-icons'>add_photo_alternate</i> &nbsp;
                                Select Photo
                                </label>
                            <input type='file' filename='postImage' accept='image/*' onChange={onChangeFile}/>
                        </div> */}

                        <div className='upload'>
                            {/* <label htmlFor='file'>Choose Post Image</label> */}
                            {/* <input type='file' filename='postImage' /> */}
                            <i className='material-icons'>add_photo_alternate</i>
                            <FileBase64
                                type='file'
                                multiple={ false }
                                onDone={ ({ base64 }) => setImage({ base64}) } />
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
                    <div><img src={post.image} /></div>
                </div>
            ))}
        </div>

    </div>
  )
}
