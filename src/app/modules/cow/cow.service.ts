import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { cowFilterableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[] | null>> => {
  const { searchTerm, minPrice=0, maxPrice=Infinity, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: cowFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  andConditions.push({
    $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
  });

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Cow.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findById(_id).populate('seller');
  return result;
};

const updateCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};

const deleteCow = async (_id: string, cow: ICow): Promise<ICow | null> => {
  const isExist = await User.findById(_id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = (await Cow.create(cow)).populate('seller');
  if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create cow`);
  }
  return result;
};

export const CowServices = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
