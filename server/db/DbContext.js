import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Vote from "../models/Vote";



class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Votes = mongoose.model("Votes", Vote);
  Comments = mongoose.model("Comments", Comment);
  Posts = mongoose.model("Posts", Post);


}

export const dbContext = new DbContext();
