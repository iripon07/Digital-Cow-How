import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IUser = {
  phoneNumber: string
  password: string
  role: 'seller' | 'buyer'
  name: UserName
  address: string
  budget: number
  income: number
}

export type UserModel = Model<IUser, Record<string, unknown>>
