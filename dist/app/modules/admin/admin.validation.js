"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'Role is required',
            }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
    }),
});
exports.AdminValidations = {
    createAdminZodSchema,
};
