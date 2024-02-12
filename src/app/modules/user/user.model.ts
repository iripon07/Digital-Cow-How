/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { role } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: role,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExist = async function (
  phoneNumber: string,
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>> {
  const user = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 },
  );
  return user as Pick<IUser, 'phoneNumber' | 'password' | 'role'>;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);

// userSchema.methods.isUserExist = async function (
//   phoneNumber: string,
// ): Promise<Partial<IUser | null>> {
//   return await User.findOne(
//     { phoneNumber },
//     { phoneNumber: 1, role: 1, password: 1 },
//   );
// };

// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string,
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };
