"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthConfig_1 = __importDefault(require("../config/AuthConfig"));
const generateToken = (params = {}) => jsonwebtoken_1.default.sign(params, AuthConfig_1.default.secret, {
    expiresIn: 86400, // 1 day
});
exports.default = generateToken;
