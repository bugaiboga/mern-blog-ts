import { Request, Response, NextFunction } from "express";

const postValidate = (req: Request, res: Response, next: NextFunction) => {
  const { category, title, description } = req.body;

  if (!category || category.trim() === "") {
    return res
      .status(400)
      .json({ message: "Category is required", typeError: "category" });
  }

  if (!title || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Title is required", typeError: "title" });
  }
  if (!description || description.trim() === "") {
    return res
      .status(400)
      .json({ message: "description is required", typeError: "description" });
  }

  next();
};

export default postValidate;
