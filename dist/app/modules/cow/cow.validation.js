"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidations = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.location], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.breeds], {
            required_error: 'Breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Number is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.label], {
            required_error: 'Label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.categories], {
            required_error: 'Breed is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.location]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.breeds]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constant_1.label]).optional(),
        category: zod_1.z.enum([...cow_constant_1.categories]).optional(),
    }),
});
exports.CowValidations = {
    createCowZodSchema,
    updateCowZodSchema,
};
