"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    totalDuration: { type: Number, required: true, min: 0 },
    totalCalories: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: () => new Date() }
});
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
