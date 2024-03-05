import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  id:string
  phoneNumber: string;
  password: string;
  role: 'seller' | 'buyer' | 'admin';
  name: UserName;
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string,
  ): Promise<Pick<IUser, 'id' | 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
