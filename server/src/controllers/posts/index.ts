import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IPost } from '../../interfaces/IPost';
import { IUser } from '../../interfaces/IUser';
import Post from '../../models/Post';
import User from '../../models/User';

export const createPost = async (req: Request, res: Response) => {
  let { title, text, user }: IPost = req.body;
  try {
    const getUser: IUser | null = await User.findById(user).select('-password');
    console.log(getUser);
    if (!getUser) res.status(500).send('User not found');

    const newPost = new Post({
      title,
      text,
      user,
    });

    const post = await newPost.save();
    getUser?.posts.push(post);
    getUser?.save();
    res.json(post);
  } catch (error) {
    res.status(501).send({ message: 'message' });
  }
};
