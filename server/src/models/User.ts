import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { PostSchema } from './Post';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [PostSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
