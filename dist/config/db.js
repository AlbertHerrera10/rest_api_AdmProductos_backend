"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // necesario para Supabase
        }
    },
    models: [__dirname + '/../models/**/*'],
    logging: false
});
exports.default = db;
//# sourceMappingURL=db.js.map