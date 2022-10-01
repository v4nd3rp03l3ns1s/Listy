
export interface IPost {
  userId?: string,
  _id?: string,
  image: string,
  name: string,
  rating: string,
  genre: string,
  likes?: number,
}

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
