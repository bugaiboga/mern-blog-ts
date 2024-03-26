import { Router } from "express";

import authController from "../controllers/authController.js";
import registerValidate from "../middleware/registerValidate.js";

const authRouter = Router();

authRouter.post("/signin", authController.login);
authRouter.post("/signup", registerValidate, authController.register);
authRouter.get("/auth", authController.auth);


export default authRouter;
