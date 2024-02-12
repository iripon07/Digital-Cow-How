import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  name: UserName;
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>;
