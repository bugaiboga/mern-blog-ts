import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: { type: String },
    likes: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
