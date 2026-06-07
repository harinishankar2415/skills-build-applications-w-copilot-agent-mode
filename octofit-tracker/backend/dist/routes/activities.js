"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find().populate('user team').sort({ createdAt: -1 }).lean();
    res.json(activities);
});
router.post('/', async (req, res) => {
    const { user, team, type, durationMinutes, caloriesBurned } = req.body;
    const activity = new Activity_1.default({ user, team, type, durationMinutes, caloriesBurned });
    await activity.save();
    res.status(201).json(activity);
});
exports.default = router;
