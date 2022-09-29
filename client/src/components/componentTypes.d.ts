export interface IPost {
  _id: string,
  image: string,
  name: string,
  rating: string,
  genre: string,
}

import mongoose from "mongoose";

export interface IUser{
  userId: {
    type: String;
    required: true;
  };
  name: {
    type: String;
    required: true;
  };
  rating: {
    type: String;
    required: true;
  };
  genre: {
    type: String;
    required: true;
  };
  image: {
    type: String;
  };
  likes: {
    type: [];
    default: [];
  };
}
