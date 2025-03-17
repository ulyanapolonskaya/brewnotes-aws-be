import mongoose, { Document, Schema } from 'mongoose';

export interface ICoffeeBean extends Document {
  name: string;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const coffeeBeanSchema = new Schema<ICoffeeBean>(
  {
    name: {
      type: String,
      required: [true, 'Coffee bean name is required'],
      trim: true,
      maxlength: [100, 'Coffee bean name cannot exceed 100 characters'],
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICoffeeBean>('CoffeeBean', coffeeBeanSchema);
