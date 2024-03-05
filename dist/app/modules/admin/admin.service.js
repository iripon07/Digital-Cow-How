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
exports.AdminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const user_model_1 = require("../user/user.model");
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkPhoneNumber = yield user_model_1.User.findOne({
        phoneNumber: payload.phoneNumber,
    });
    if (checkPhoneNumber) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `Already use this number`);
    }
    payload.role = 'admin';
    const createdAdmin = yield user_model_1.User.create(payload);
    const result = yield user_model_1.User.findById(createdAdmin._id);
    if (!createdAdmin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Failed to create admin`);
    }
    return result;
});
exports.AdminServices = {
    createAdmin,
};
