"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUser = exports.Login = exports.Signup = void 0;
const userModel_1 = __importDefault(require("./userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oneDay = 23 * 60 * 60 * 1000; // 82800000
const sevenDay = 6 * 24 * 60 * 60 * 1000; // 518400000
const getToken = (user) => {
    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: oneDay,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: sevenDay,
    });
    return {
        accessToken,
        refreshToken,
    };
};
const Signup = async (req, res) => {
    try {
        const user = new userModel_1.default(req.body);
        await user.save();
        res.status(200).json({ message: 'Signup success' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
};
exports.Signup = Signup;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user)
            throw new Error('user not found !');
        const validUser = await bcrypt_1.default.compare(password, user.password);
        if (!validUser)
            throw new Error('Incorrect Password !');
        const { accessToken, refreshToken } = getToken(user);
        res.cookie('accessToken', accessToken, {
            maxAge: oneDay,
            domain: process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.DOMAIN,
            secure: process.env.NODE_ENV === 'dev' ? false : true,
            httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: sevenDay,
            domain: process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.DOMAIN,
            secure: process.env.NODE_ENV === 'dev' ? false : true,
            httpOnly: true,
        });
        res
            .status(200)
            .json({ message: 'Login success', refreshToken, accessToken });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.Login = Login;
const LogoutUser = (req, res) => {
    res.cookie('accessToken', null, {
        maxAge: 0,
        domain: process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.DOMAIN,
        secure: process.env.NODE_ENV === 'dev' ? false : true,
        httpOnly: true,
    });
    res.cookie('refreshToken', null, {
        maxAge: 0,
        domain: process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.DOMAIN,
        secure: process.env.NODE_ENV === 'dev' ? false : true,
        httpOnly: true,
    });
    res.json({ message: 'Logout success !' });
};
exports.LogoutUser = LogoutUser;
