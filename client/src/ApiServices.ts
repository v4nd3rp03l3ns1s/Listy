import { IPost, IUser } from "./components/componentTypes";
import axios from "axios";


const BASE_URL = 'http://localhost:3030'

export const getUserPosts = async (token :string) :Promise<IUser> => { //for use in Add component
  const response = await fetch(
    `${BASE_URL}/api/posts/allposts`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
  const responseData = await response.json();
  return responseData
}


const createPost = async (post:IPost, accessToken:string) :Promise<IPost>  => {  //for use in Add componenet
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json', Authorization: `Bearer ${accessToken}`, },
    body: JSON.stringify(post)
  });
  const data = await response.json();
  return data
}

const deletePost = async (id :string) => {  //for use in Add component
  const response = await fetch(`${BASE_URL}/api/posts/post/delete/${id}`, {
    method: "DELETE"
  })
  const data = await response.json();
  return data;
}

//for use is MainFeed Component, is currently hardcoded for specific userID
//this is likely only used for presentational purposes and not meant to be used to generate the main feed
const fetchPosts = async (usedId :string) => {
  const res = await axios.get(`${BASE_URL}/mainfeed/6335e3cffbd608ee0320cb14`);
  return res.data

}

//commented out in MainFeed component, likely meant tp beu sed to get the main feed
const fetchMainfeedPosts = async (token :string) => {
  try {
    const response = await fetch(
    `${BASE_URL}/api/posts/mainfeed`,
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    const data = await response.json();
    return data
    } catch (error) {
      console.error('Error: ', error)
    }
}

//commented out from Post Component, 
const getUser = async (userId :string) =>{
  const res = await axios.get(`${BASE_URL}/api/auth/users/${userId}`);
  return res.data;
};