import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/UserModel.js";
import { ObjectId } from "mongoose";

const { JWT_SECRET } = process.env;
const generateJwt = ({
  email,
  _id,
  username,
  avatar,
}: {
  email: string;
  _id: string;
  username: string;
  avatar: string;
}): string => {
  if (JWT_SECRET) {
    return jwt.sign({ email, _id, username, avatar }, JWT_SECRET, {
      expiresIn: "24h",
    });
  }
  throw new Error("JWT_SECRET is not defined.");
};

class authController {
  async register(req: Request, res: Response) {
    const { email, password, username } = req.body;

    try {
      const candidate = await User.findOne({ email });

      if (candidate)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = bcrypt.hashSync(password, 4);

      const result = await User.create({
        email,
        password: hashedPassword,
        username,
      });

      const token = generateJwt({
        email: result.email,
        _id: result._id.toHexString(),
        username: result.username,
        avatar: result.avatar,
      });

      res.status(200).json({ token });
    } catch (e: any) {
      console.log(e);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const candidate = await User.findOne({ email });

      if (!candidate)
        return res
          .status(404)
          .json({ message: "User doesn't exist", typeError: "email" });

      const hashedPassword = bcrypt.compareSync(password, candidate.password);

      if (!hashedPassword)
        return res
          .status(404)
          .json({ message: "password don't valid", typeError: "password" });

      const token = generateJwt({
        email: candidate.email,
        _id: candidate._id.toHexString(),
        username: candidate.username,
        avatar: candidate.avatar,
      });

      res.status(200).json({ token });
    } catch (e: any) {
      console.log(e);
    }
  }

  async auth(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Token is missing" });
    }

    try {
      if (!JWT_SECRET) return;

      const decoded = await jwt.verify(token, JWT_SECRET);

      if (typeof decoded === "string") {
        return res
          .status(403)
          .json({ message: "Authentication failed: Invalid token" });
      }

      const user = await User.findOne({ _id: decoded._id });

      if (user) {
        const newToken = generateJwt({
          email: user.email,
          _id: user._id.toHexString(),
          username: user.username,
          avatar: user.avatar,
        });

        res.status(200).json({ token: newToken });
      }
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed: Invalid token" });
    }
  }
}

export default new authController();
