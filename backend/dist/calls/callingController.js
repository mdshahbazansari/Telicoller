"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCalls = exports.UpdateCalls = exports.FetchCallsById = exports.FetchCalls = exports.CreateCalls = void 0;
const callingModel_1 = __importDefault(require("./callingModel"));
const customerModel_1 = __importDefault(require("../customer.ts/customerModel"));
const CreateCalls = async (req, res) => {
    try {
        const call = new callingModel_1.default(req.body);
        await call.save();
        res.status(200).json({ message: 'calling', call });
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.CreateCalls = CreateCalls;
const FetchCalls = async (req, res) => {
    try {
        const calls = await callingModel_1.default.find()
            .populate('customer', 'fullname email mobile') // 🟢 Fetch customer data
            .sort({ createdAt: -1 });
        if (!calls || calls.length === 0) {
            res.status(404).json({ message: 'Call-logs not found' });
            return;
        }
        res.status(200).json(calls);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FetchCalls = FetchCalls;
const FetchCallsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Customer ID is required' });
            return;
        }
        const callLogs = await callingModel_1.default.find({ customer: id })
            .populate('customer', 'name email mobile')
            .sort({ createdAt: -1 });
        if (!callLogs || callLogs.length === 0) {
            res.status(404).json({ message: 'No call logs found for this customer' });
            return;
        }
        res.status(200).json(callLogs);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FetchCallsById = FetchCallsById;
const UpdateCalls = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes, status } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Customer ID is required' });
            return;
        }
        const customer = await customerModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }
        await callingModel_1.default.updateMany({ customer: id }, { notes, status }, { new: true });
        res
            .status(200)
            .json({ message: 'Customer and call logs updated successfully' });
        return;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};
exports.UpdateCalls = UpdateCalls;
const DeleteCalls = async (req, res) => {
    try {
        const { id } = req.params;
        const call = await callingModel_1.default.findByIdAndDelete(id);
        if (!call)
            res.status(404).json({ message: 'Call-Log not found' });
        res.status(200).json({ message: 'Call disconneted', call });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.DeleteCalls = DeleteCalls;
