"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel = new mongoose_1.Schema({
    fullname: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userModel.pre('save', async function (next) {
    const hashPassword = await bcrypt_1.default.hash(this.password.toString(), 12);
    this.password = hashPassword;
    next();
});
const UserModel = (0, mongoose_1.model)('User', userModel);
exports.default = UserModel;
