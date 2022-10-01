import { IPost, IUser } from "./components/componentTypes";
import axios from "axios";


const BASE_URL = 'http://localhost:3030'

export const createPost = async (post:IPost) :Promise<IPost>  => {  //for use in Add componenet
  const response = await fetch(`${BASE_URL}/api/posts/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json', },
    body: JSON.stringify(post)
  });
  const data = await response.json();
  return data;
}

export const deletePost = async (id? :string) => {  //for use in Add component
  await fetch(`${BASE_URL}/api/posts/post/delete/${id}`, {
    method: "DELETE"
  })
}



export const likePost = async (id: string, upvote: string) => {
  const response = await fetch(`${BASE_URL}/api/posts/like/${id}`, {
    method :'PUT',
    headers :{'Content-Type' :'application/json' } ,
    body: JSON.stringify({upvote})
  });
  const data = await response.json();
  console.log(data)
  return data;
}

//commented out in MainFeed component, likely meant to be used to get the main feed
export const fetchMainfeedPosts = async (userId :string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/posts/mainfeed/${userId}`);
    const data = await response.json();
    return data;
    } catch (error) {
      console.error('Error: ', error)
    }
}