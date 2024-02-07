import { Schema, model } from 'mongoose';
import { breeds, categories, label, location } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow, CowModel>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: location,
  },
  breed: {
    type: String,
    required: true,
    enum: breeds,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
    enum: label,
    default:'sale'
  },
  category: {
    type: String,
    required: true,
    enum: categories,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
}, {
  timestamps:true
});

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
