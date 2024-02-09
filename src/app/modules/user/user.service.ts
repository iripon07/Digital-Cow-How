import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

// const getAllUsers = async (
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<IUser[]>> => {
//   const {page, limit, skip, sortBy, sortOrder} = calculatePagination(paginationOptions)

//   const sortConditions:{[key: string]:number}={}
//   if(sortBy && sortOrder){
//     sortConditions[sortBy]=sortOrder
//   }

//   const result = await User.find().sort(sortConditions).skip(skip).limit(limit);
//   const total = await User.countDocuments();

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// }

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id:id });
  return result;
};

const updateUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  if (!user) {
    throw new Error(`Failed to create user`);
  }
  return result;
};

const deleteUser = async (id:string):Promise<IUser|null> => {
  const result = await User.findByIdAndDelete({_id:id});
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
