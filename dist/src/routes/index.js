"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./User/index"));
const index_2 = __importDefault(require("./Auth/index"));
exports.default = [index_2.default, index_1.default];
