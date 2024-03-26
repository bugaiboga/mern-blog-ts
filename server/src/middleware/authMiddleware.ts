import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}


const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET failed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };

      req.userId = decoded._id;
    }

    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authMiddleware;
