import { Request, Response } from "express";
import { RequestFileUpload } from "../middleware/uploadImageMiddleware.js";
import Post from "../models/PostModel.js";

class postController {
  async createPost(req: RequestFileUpload, res: Response) {
    const { title, description, category } = req.body;
    const filePath = req.filePath;
    const userId = req.userId;

    try {
      const post = new Post({
        title,
        description,
        category,
        creator: userId,
        imageUrl: filePath,
      });

      await post.save();

      return res.status(201).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async getPost(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await Post.findById(id)
        .populate({
          path: "creator",
          select: "username avatar email",
        })
        .populate({
          path: "category",
          select: "name",
        });

      res.status(200).json(post);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getPosts(req: Request, res: Response) {
    const { page } = req.query;

    try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT;

      const total = await Post.countDocuments({});
      const posts = await Post.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);

      let numberOfPages = Math.ceil(total / LIMIT);

      if (total <= LIMIT) {
        numberOfPages = 1;
      }

      const currentPage = Number(page);

      res.json({
        posts,
        currentPage,
        numberOfPages,
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getPostsBySearch(req: Request, res: Response) {
    const { page, searchQuery } = req.query;

    try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT;

      const query = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      };

      const total = await Post.countDocuments(query);
      const posts = await Post.find(query)
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);

      let numberOfPages = Math.ceil(total / LIMIT);

      if (total <= LIMIT) {
        numberOfPages = 1;
      }

      res.json({
        posts,
        currentPage: Number(page),
        numberOfPages,
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new postController();
