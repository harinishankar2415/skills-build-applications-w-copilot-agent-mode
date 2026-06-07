"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().populate('members').sort({ createdAt: -1 }).lean();
    res.json(teams);
});
router.post('/', async (req, res) => {
    const { name, description, members } = req.body;
    const team = new Team_1.default({ name, description, members: members || [] });
    await team.save();
    res.status(201).json(team);
});
exports.default = router;
