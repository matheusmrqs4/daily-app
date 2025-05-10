import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from '../../models/Authentication/userModel';
import { generateToken } from "../../utils/jwt";

const handleError = (res: Response, message: string, statusCode: number) => {
  res.status(statusCode).json({ error: message });
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return handleError(res, "Please fill all fields", 400);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleError(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id.toString());
    res.status(201).json({ token });
  } catch (error) {
    handleError(res, "Server error", 500);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, "Please fill all fields", 400);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return handleError(res, 'User not found', 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleError(res, 'Invalid credentials', 401);

    const token = generateToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    handleError(res, 'Error logging in', 500);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return handleError(res, 'User not found', 404);

    res.json(user);
  } catch (error) {
    handleError(res, 'Error fetching user profile', 500);
  }
};
