import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId


const Vote = new Schema({
  creatorEmail: { type: String, required: true },
  post: { type: ObjectId, ref: 'Posts', required: true },
  value: { type: Number, enum: [1, -1] }
}, { timestamps: true, toJSON: { virtuals: true } }
)

Vote.index({ creatorEmail: 1, post: 1 }, { unique: true })

Vote.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Vote