import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    post: { type: ObjectId, ref: "Post" }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Comment;
