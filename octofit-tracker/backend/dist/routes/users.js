"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.default.find().sort({ createdAt: -1 }).lean();
    res.json(users);
});
router.post('/', async (req, res) => {
    const { name, email, team } = req.body;
    const user = new User_1.default({ name, email, team });
    await user.save();
    res.status(201).json(user);
});
exports.default = router;
