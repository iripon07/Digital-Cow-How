"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
//Get Profile by Admin, Buyer, and Seller
router.get('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), user_controller_1.UserControllers.myProfile);
//Update Profile by Admin, Buyer, and Seller
router.patch('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserControllers.updateMyProfile);
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/:id', user_controller_1.UserControllers.getSingleUser);
router.patch('/:id', user_controller_1.UserControllers.updateUser);
router.delete('/:id', user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
