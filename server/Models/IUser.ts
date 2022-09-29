import mongoose from "mongoose";

interface IUser extends mongoose.Document{
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
    // required: true
  };
  likes: {
    type: [];
    default: [];
  };
}

export default IUser;
