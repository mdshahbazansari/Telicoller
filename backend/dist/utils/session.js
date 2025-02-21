"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Session = async (req, res) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken)
            throw new Error('Unauthorize session !');
        const user = jsonwebtoken_1.default.verify(accessToken, process.env.AUTH_SECRET);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Session failed !' });
    }
};
exports.Session = Session;
