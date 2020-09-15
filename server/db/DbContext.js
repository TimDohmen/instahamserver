import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import Post from "../models/Post";
import Comment from "../models/Comment";


class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Comments = mongoose.model("Comments", Comment);
  Posts = mongoose.model("Posts", Post);

}

export const dbContext = new DbContext();
