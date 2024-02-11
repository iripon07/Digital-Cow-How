import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";


const createAdmin = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

export const AdminServices = {
  createAdmin,
};
