"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(['seller', 'buyer']).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }),
        })
            .optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.UserValidation = {
    updateUserZodSchema,
};
