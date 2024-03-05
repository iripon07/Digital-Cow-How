import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICowFilters = {
  searchTerm?: string;
  minPrice?:number,
  maxPrice?:number
};

export type ILocation =
  | 'Dhaka'
  | 'Mymensingh'
  | 'Rangpur'
  | 'Khulna'
  | 'Sylhet'
  | 'Rajshahi'
  | 'Barishal'
  | 'Chattogram';

export type IBreed =
  | 'Kankrej'
  | 'Tharparkar'
  | 'Indigenous'
  | 'Gir'
  | 'Sahiwal'
  | 'Nellore'
  | 'Brahman';

export type ILabel = 'for sale' | 'sold';
export type ICategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICow = {
  name: string;
  age: number;
  location: ILocation;
  price: number;
  breed: IBreed;
  weight: number;
  label: ILabel;
  category: ICategory;
  seller: IUser & Types.ObjectId;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
