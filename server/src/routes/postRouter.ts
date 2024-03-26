import { Router } from "express";

import postController from "../controllers/postController.js";
import postValidate from "../middleware/postValidat.js";
import uploadImageMiddleware from "../middleware/uploadImageMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const postRouter = Router();

postRouter.post(
  "/",
  authMiddleware,
  postValidate,
  uploadImageMiddleware,
  postController.createPost
);

postRouter.get("/search", postController.getPostsBySearch);
postRouter.get("/post/:id", postController.getPost);
postRouter.get("/", postController.getPosts);

export default postRouter;
