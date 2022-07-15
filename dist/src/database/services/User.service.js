"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
class UserService {
    async store(data) {
        const saltRounds = 10;
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hashedPassword = bcrypt_1.default.hashSync(data.password, salt);
        const user = await User_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        user.password = undefined;
        return user;
    }
    async getAll() {
        const users = await User_1.default.findAll({
            where: [{ role: "User" }],
        });
        return users;
    }
    findByPk(id) {
        return User_1.default.findByPk(id);
    }
    findByEmail(email) {
        return User_1.default.findOne({ where: { email } });
    }
    async update(id, data) {
        await User_1.default.update(data, { where: { id } });
        const updatedUser = await User_1.default.findByPk(id);
        return updatedUser;
    }
    async destroy(id) {
        await User_1.default.destroy({ where: { id } });
    }
}
exports.default = UserService;
