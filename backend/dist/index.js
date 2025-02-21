"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log('Database connected 😍');
})
    .catch(() => {
    console.log('Connection failed 😫!');
});
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const customerRoutes_1 = __importDefault(require("./customer.ts/customerRoutes"));
const callingRoutes_1 = __importDefault(require("./calls/callingRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server run on PORT : ${PORT} 👈🏻`);
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Lets start Now');
});
//API's
app.use('/api/user', userRoutes_1.default);
app.use('/api/customers', customerRoutes_1.default);
app.use('/api/call-logs', callingRoutes_1.default);
