import { Request, Response } from "express";

import Comment from "../models/CommentMode.js";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import Post from "../models/PostModel.js";

class commentController {
  async getPostComments(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const comments = await Comment.find({ postId: id })
        .sort({ createdAt: -1 })
        .populate({
          path: "creator",
          select: "username avatar email",
        })
        .exec();

      res.status(200).json(comments);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
  async createComment(req: AuthenticatedRequest, res: Response) {
    const { text, postId } = req.body;
    const creator = req.userId;

    try {
      const newComment = new Comment({ text, postId, creator });
      await newComment.save();

      const comment = await Comment.findById(newComment._id).populate({
        path: "creator",
        select: "username avatar email",
      });

      res.status(201).json(comment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new commentController();
