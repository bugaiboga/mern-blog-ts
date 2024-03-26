import { Request, Response, NextFunction } from "express";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return passwordRegex.test(password);
};
const validateRePassword = ({
  password,
  repassword,
}: {
  password: string;
  repassword: string;
}): boolean => {
  return password === repassword;
};

const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

const registerValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, repassword, username } = req.body;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: "Invalid email", errorType: "email" });
  }
  if (!validateUsername(username)) {
    return res
      .status(400)
      .json({ message: "Invalid username", errorType: "username" });
  }
  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ message: "Invalid password", errorType: "password" });
  }
  if (!validateRePassword({ password, repassword })) {
    return res
      .status(400)
      .json({ message: "Invalid repassword", errorType: "repassword" });
  }

  next();
};

export default registerValidate;
