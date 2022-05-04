import { Document } from 'mongoose';
import { IPost } from './IPost';

export interface IUser extends Document {
  username: string;
  password: string;
  posts: [IPost];
}
