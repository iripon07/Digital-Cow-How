import { z } from 'zod';
import { role } from './auth.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),

    name: z.object({
      firstName: z.string({
        required_error: 'Role is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AuthValidations = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
