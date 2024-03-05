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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = require("./user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `Invalid id, user doesn't exits`);
    }
    const isNumberExist = yield user_model_1.User.findOne({
        phoneNumber: payload === null || payload === void 0 ? void 0 : payload.phoneNumber,
    });
    if (isNumberExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This number already used');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete({ _id: id });
    return result;
});
const myProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield user_model_1.User.findOne({ phoneNumber: userInfo === null || userInfo === void 0 ? void 0 : userInfo.phoneNumber });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!');
    }
    return result;
});
const updateMyProfile = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (payload.phoneNumber && payload.role) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Can not change phoneNumber and role');
    }
    const result = yield user_model_1.User.findOneAndUpdate({
        phoneNumber: userInfo === null || userInfo === void 0 ? void 0 : userInfo.phoneNumber,
    }, payload, { new: true });
    return result;
});
exports.UserServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    myProfile,
    updateMyProfile,
};
