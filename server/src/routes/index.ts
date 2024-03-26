import { Router } from "express";
import authRouter from "./authRouter.js";
import categoryRouter from "./categoryAuth.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/category", categoryRouter);
router.use("/comment", commentRouter);

export default router;
