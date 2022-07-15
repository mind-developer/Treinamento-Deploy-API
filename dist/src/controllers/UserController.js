"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../database/services/User.service"));
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
class UserController {
    constructor() {
        this.userService = new User_service_1.default();
    }
    /**
     * @openapi
     * components:
     *  schemas:
     *    LoginUser:
     *      type: object
     *      required:
     *        - email
     *        - password
     *      properties:
     *        email:
     *          type: string
     *          default: user@teste.com
     *        password:
     *          type: string
     *          default: 123456
     */
    async store(req, res) {
        try {
            const data = req.body;
            const emailExists = await this.userService.findByEmail(data.email);
            if (emailExists)
                return res.status(403).json({ message: "E-mail já cadastrado!" });
            const user = await this.userService.store(data);
            return res
                .status(201)
                .json({ user, token: (0, generateToken_1.default)({ id: user.id }) });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async index(req, res) {
        try {
            const users = await this.userService.getAll();
            if (users.length > 0)
                return res.status(200).json(users);
            return res.status(204).json();
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async findOne(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.findByPk(+id);
            if (user === null)
                return res.status(204).json();
            return res.status(200).json(user);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await this.userService.findByPk(+id);
            if (user === null)
                return res.status(204).json();
            await this.userService.update(+id, data);
            return res
                .status(200)
                .json({ message: "Usuário atualizado com sucesso!" });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.findByPk(+id);
            if (user === null)
                return res.status(204).json();
            await this.userService.destroy(+id);
            return res.status(200).json({ message: "Usuário removido com sucesso!" });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
}
exports.default = new UserController();
