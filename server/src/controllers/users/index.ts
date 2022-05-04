import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/User';

const saltRounds: number = 10;

const encryptPassword = async (password: string) => {
  let newPassword: string = '';
  await bcrypt.hash(password, saltRounds).then(function (hash: any) {
    newPassword = hash;
  });
  return newPassword;
};

export const getUser = async (req: Request, res: Response) => {
  let { id } = req.body;
  try {
    const user = await User.findById(id).select('-password');
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createUser = async (req: Request, res: Response) => {
  let { username, password }: IUser = req.body;

  // Bcrypt
  password = await encryptPassword(password);

  const user = new User({
    username,
    password,
  });
  try {
    const response = await user.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(501).send({ message: 'message' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await User.find();
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
