import { Schema, model } from 'mongoose'
import { role } from './user.constant'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
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
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser>('User', userSchema)
