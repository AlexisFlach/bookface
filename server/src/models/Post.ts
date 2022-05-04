import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces/IPost';

export const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>('Album', PostSchema);
