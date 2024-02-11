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
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrder = (cow, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById({ _id: buyer });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `User doesn't exist`);
    }
    const isCowExist = yield cow_model_1.Cow.findById({ _id: cow });
    if (!isCowExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, `Cow doesn't exist`);
    }
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.budget) < (isCowExist === null || isCowExist === void 0 ? void 0 : isCowExist.price)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, `You haven't enough for buying your desired cow`);
    }
    if ((isCowExist === null || isCowExist === void 0 ? void 0 : isCowExist.label) === 'sold') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, `Opss! Cow has already sold out`);
    }
    let createdOrder;
    const session = yield mongoose_1.default.startSession();
    try {
        yield cow_model_1.Cow.findByIdAndUpdate({
            _id: cow,
        }, { label: 'sold' }, { session });
        yield user_model_1.User.findByIdAndUpdate({ _id: isCowExist.seller }, { $inc: { income: isCowExist.price } }, { session });
        yield user_model_1.User.findByIdAndUpdate({ _id: isUserExist._id }, {
            $inc: { budget: -isCowExist.price },
        }, { session });
        createdOrder = yield order_model_1.Order.create([{ cow, buyer: isUserExist._id }], {
            session,
        });
        if (!createdOrder) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed t create order');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const order = order_model_1.Order.findById(createdOrder[0]._id)
        .populate({
        path: 'cow',
        model: 'Cow',
    })
        .populate({
        path: 'buyer',
        model: 'User',
    });
    console.log(order);
    return order;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
const getSingleOrder = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.OrderServices = {
    createOrder,
    getOrders,
    getSingleOrder,
};
