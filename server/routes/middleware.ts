const { auth } = require("express-oauth2-jwt-bearer");
const User = require("../Models/User");
import { Request, Response } from "express";
import IUser from "../Models/IUser";

interface UserAuth extends Request {
  auth: {
    userId: string;
    payload: {
      sub: string;
    };
  };
  currUser: IUser;
}

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "http://localhost:3030",
  issuerBaseURL: `https://listy.us.auth0.com/`,
});

const checkJwt2 = async (req: UserAuth, res: Response, next: Function) => {
  req.auth.userId = req.auth.payload.sub.split("|")[1];
  // req.auth.userId is the userId
  // console.log(req.auth.userId)

  //check if user is in the data base
  console.log(req.auth.userId);
  let user = await User.findById(req.auth.userId);
  console.log(user);
  if (!user) {
    console.log("auth0 user does not exsist in local database, creating...");
    const newUser = new User({ _id: req.auth.userId });
    await newUser.save();
    user = newUser;
    // req.verifiedId = newUser_id
  }
  req.currUser = user;
  next();
};

module.exports = { checkJwt, checkJwt2 };
