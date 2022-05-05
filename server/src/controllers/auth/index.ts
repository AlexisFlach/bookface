import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/User';

dotenv.config();

const secret: string = process.env.SECRET || '';
export const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const validateUser = async (req: Request, res: Response) => {
  let { username, password }: IUser = req.body;

  try {
    let user: any = await User.findOne({ username });

    if (!user)
      res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(501).send({ message: 'message' });
  }
};
