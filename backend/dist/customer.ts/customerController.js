"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = exports.DeleteCustomer = exports.UpdateCustomer = exports.FetchCustomerById = exports.FetchCustomerLogs = exports.FetchCustomer = exports.CreateCustomer = void 0;
const customerModel_1 = __importDefault(require("./customerModel"));
const node_1 = __importDefault(require("read-excel-file/node"));
const CreateCustomer = async (req, res) => {
    try {
        const { email } = req.body;
        const isCustomer = await customerModel_1.default.findOne({ email });
        if (isCustomer) {
            throw new Error('Already have an Customer || customer exist');
        }
        const customer = new customerModel_1.default(req.body);
        await customer.save();
        res.status(200).json(customer);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.CreateCustomer = CreateCustomer;
const FetchCustomer = async (req, res) => {
    try {
        const customer = await customerModel_1.default.find().sort({ createdAt: -1 });
        if (!customer) {
            res.json({ message: 'Something is error | check database' });
            return;
        }
        res.status(200).json(customer);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FetchCustomer = FetchCustomer;
const FetchCustomerLogs = async (req, res) => {
    try {
        const customer = await customerModel_1.default.find().sort({ createdAt: -1 });
        if (!customer) {
            res.json({ message: 'Something is error | check database' });
            return;
        }
        res.status(200).json(customer);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FetchCustomerLogs = FetchCustomerLogs;
const FetchCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel_1.default.findById(id);
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }
        res.status(200).json(customer);
        return;
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FetchCustomerById = FetchCustomerById;
const UpdateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }
        res.status(200).json(customer);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.UpdateCustomer = UpdateCustomer;
const DeleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel_1.default.findByIdAndDelete(id);
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.DeleteCustomer = DeleteCustomer;
const readExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const filePath = req.file.path;
        const rows = await (0, node_1.default)(filePath);
        const headers = rows.shift();
        const customers = rows.map((row) => ({
            fullname: row[0],
            email: row[1],
            mobile: row[2],
        }));
        const savedCustomers = await customerModel_1.default.insertMany(customers);
        res
            .status(200)
            .json({ message: 'Data saved successfully', data: savedCustomers });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.readExcel = readExcel;
