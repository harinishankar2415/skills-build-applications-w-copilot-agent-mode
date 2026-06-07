"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.default.find()
        .sort({ rank: 1, totalDuration: -1 })
        .populate('user', 'name')
        .populate('team', 'name')
        .lean();
    res.json(leaderboard);
});
exports.default = router;
