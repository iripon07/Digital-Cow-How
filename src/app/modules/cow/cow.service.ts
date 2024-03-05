import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import config from '../../../config';
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
  const {
    searchTerm,
    minPrice = 0,
    maxPrice = Infinity,
    ...filterData
  } = filters;
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
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Cow.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>,
  token: string,
): Promise<ICow | null> => {
  if (payload.seller) {
    throw new ApiError(httpStatus.CONFLICT, 'Can not change seller id');
  }
  const userInfo = (await jwt.verify(
    token,
    config.jwt.secret as Secret,
  )) as JwtPayload;
  const cow = await Cow.findById(id).populate('seller');
  if (userInfo.phoneNumber !== cow?.seller?.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow');
  }
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const deleteCow = async (id: string, token: string): Promise<ICow | null> => {
  const userInfo = (await jwt.verify(
    token,
    config.jwt.secret as Secret,
  )) as JwtPayload;
  const cow = await Cow.findById(id).populate('seller');
  if (userInfo?.phoneNumber !== cow?.seller?.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!');
  }
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowServices = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
