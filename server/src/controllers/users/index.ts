import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/User';
import { encryptPassword } from '../shared';

dotenv.config();

const secret: string = process.env.SECRET || '';

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
  console.log(secret);
  let { username, password }: IUser = req.body;
  password = await encryptPassword(password);

  const user = new User({
    username,
    password,
  });
  try {
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    // res.status(201).send(user);
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
