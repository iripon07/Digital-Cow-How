import { z } from 'zod';
import { breeds, categories, label, location } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...breeds] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'Number is required',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...categories] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breeds] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...categories] as [string, ...string[]]).optional(),
  }),
});

export const CowValidations = {
  createCowZodSchema,
  updateCowZodSchema,
};
