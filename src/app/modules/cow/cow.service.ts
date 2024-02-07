import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const result = await Cow.create(cow);
  if (!cow) {
    throw new Error(`Failed to create cow`);
  }
  return result;
};

export const CowServices = {
  createCow,
};
