import { Request, Response } from "express";
import { Category } from "../models/CategoryModel.js";

class categoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await Category.find();

      return res.json({ categories });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new categoryController();
