"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("./customerController");
const multer_1 = __importDefault(require("multer"));
const customerRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
customerRouter.post('/', customerController_1.CreateCustomer);
customerRouter.get('/', customerController_1.FetchCustomer);
customerRouter.get('/:id', customerController_1.FetchCustomerById);
customerRouter.put('/:id', customerController_1.UpdateCustomer);
customerRouter.delete('/:id', customerController_1.DeleteCustomer);
customerRouter.post('/read-file', upload.single('file'), customerController_1.readExcel);
exports.default = customerRouter;
