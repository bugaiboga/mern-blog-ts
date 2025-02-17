import { Router } from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);

export default categoryRouter;
