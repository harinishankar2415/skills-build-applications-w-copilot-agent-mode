"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
/**
 * Seed the octofit_db database with test data.
 */
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';
async function main() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URL);
    console.log('Connected to MongoDB:', MONGO_URL);
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({})
    ]);
    const users = await User_1.default.create([
        { name: 'Alicia Carter', email: 'alicia.carter@example.com' },
        { name: 'Marco Lee', email: 'marco.lee@example.com' },
        { name: 'Dani Patel', email: 'dani.patel@example.com' },
        { name: 'Naomi Brooks', email: 'naomi.brooks@example.com' }
    ]);
    const teams = await Team_1.default.create([
        { name: 'Peak Performance', description: 'High intensity training and recovery.', members: [users[0]._id, users[1]._id] },
        { name: 'Sprint Squad', description: 'Fast-paced team workouts and challenges.', members: [users[2]._id, users[3]._id] }
    ]);
    const workouts = await Workout_1.default.create([
        {
            title: 'HIIT Express',
            description: 'A quick high-intensity interval training session for busy athletes.',
            category: 'Cardio',
            difficulty: 'Medium',
            durationMinutes: 30
        },
        {
            title: 'Endurance Ride',
            description: 'Long-distance cycling session built for stamina and pacing.',
            category: 'Cycling',
            difficulty: 'Hard',
            durationMinutes: 90
        },
        {
            title: 'Core Strength',
            description: 'Focused strength routine for core stability and posture.',
            category: 'Strength',
            difficulty: 'Easy',
            durationMinutes: 45
        },
        {
            title: 'Recovery Yoga',
            description: 'Stretching and mobility flow to support fast recovery.',
            category: 'Yoga',
            difficulty: 'Easy',
            durationMinutes: 40
        }
    ]);
    const activities = await Activity_1.default.create([
        {
            user: users[0]._id,
            team: teams[0]._id,
            type: 'HIIT Session',
            durationMinutes: 30,
            caloriesBurned: 320
        },
        {
            user: users[0]._id,
            team: teams[0]._id,
            type: 'Recovery Yoga',
            durationMinutes: 40,
            caloriesBurned: 170
        },
        {
            user: users[1]._id,
            team: teams[0]._id,
            type: 'Strength Training',
            durationMinutes: 60,
            caloriesBurned: 520
        },
        {
            user: users[1]._id,
            team: teams[0]._id,
            type: 'Endurance Ride',
            durationMinutes: 90,
            caloriesBurned: 740
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            type: 'Core Strength',
            durationMinutes: 45,
            caloriesBurned: 280
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            type: 'HIIT Session',
            durationMinutes: 35,
            caloriesBurned: 340
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            type: 'Recovery Yoga',
            durationMinutes: 40,
            caloriesBurned: 160
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            type: 'Endurance Ride',
            durationMinutes: 80,
            caloriesBurned: 680
        }
    ]);
    const leaderboardEntries = [
        {
            user: users[1]._id,
            team: teams[0]._id,
            totalDuration: 150,
            totalCalories: 1260,
            activityCount: 2,
            rank: 1
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            totalDuration: 80,
            totalCalories: 620,
            activityCount: 2,
            rank: 2
        },
        {
            user: users[0]._id,
            team: teams[0]._id,
            totalDuration: 70,
            totalCalories: 490,
            activityCount: 2,
            rank: 3
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            totalDuration: 120,
            totalCalories: 840,
            activityCount: 2,
            rank: 4
        }
    ];
    await Leaderboard_1.default.create(leaderboardEntries);
    console.log('Seed complete:');
    console.log('- Users:', users.length);
    console.log('- Teams:', teams.length);
    console.log('- Workouts:', workouts.length);
    console.log('- Activities:', activities.length);
    console.log('- Leaderboard entries:', leaderboardEntries.length);
    await mongoose_1.default.disconnect();
    process.exit(0);
}
main().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
