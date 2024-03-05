"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("../user/user.model");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCow = (_id, cow) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(_id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not exist');
    }
    const result = (yield cow_model_1.Cow.create(cow)).populate('seller');
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create cow`);
    }
    return result;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice = 0, maxPrice = Infinity } = filters, filterData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowFilterableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find({ $and: andConditions })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateCow = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (payload.seller) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Can not change seller id');
    }
    const userInfo = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret));
    const cow = yield cow_model_1.Cow.findById(id).populate('seller');
    if (userInfo.phoneNumber !== ((_a = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _a === void 0 ? void 0 : _a.phoneNumber)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'This is not your cow');
    }
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
const deleteCow = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userInfo = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret));
    const cow = yield cow_model_1.Cow.findById(id).populate('seller');
    if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.phoneNumber) !== ((_b = cow === null || cow === void 0 ? void 0 : cow.seller) === null || _b === void 0 ? void 0 : _b.phoneNumber)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'This is not your cow!');
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowServices = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
