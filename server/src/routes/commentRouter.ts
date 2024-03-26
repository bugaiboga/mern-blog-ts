import { Router } from "express";
import commentController from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const commentRouter = Router();

commentRouter.get("/post/:id", commentController.getPostComments);
commentRouter.post("/create", authMiddleware, commentController.createComment);

export default commentRouter;
