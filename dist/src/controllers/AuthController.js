"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
const mailer_1 = __importDefault(require("../helpers/mailer"));
const User_service_1 = __importDefault(require("../database/services/User.service"));
class AuthController {
    constructor() {
        this.userService = new User_service_1.default();
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.findByEmail(email);
            if (user) {
                if (!(await bcrypt_1.default.compare(password, user.password)))
                    return res.status(400).json({ message: "Senha inválida!" });
                const newUser = {
                    id: user.id,
                    email: user.email,
                };
                return res.status(200).json({ user, token: (0, generateToken_1.default)(newUser) });
            }
            return res.status(200).json({ user });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async getUserByToken(req, res) {
        try {
            const { token } = req.body;
            const userInfo = jsonwebtoken_1.default.decode(token);
            const user = await this.userService.findByPk(userInfo.id);
            return res.status(200).json({ token, user });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async forgot(req, res) {
        try {
            const { email } = req.body;
            const user = await this.userService.findByEmail(email);
            if (user) {
                const recoverPasswordCode = crypto_1.default.randomBytes(20).toString("hex");
                const now = new Date();
                now.setHours(now.getHours() + 1); // expiração do código em 1 hora
                await this.userService.update(user.id, Object.assign(Object.assign({}, user), { passwordResetToken: recoverPasswordCode, passwordResetExpires: now }));
                mailer_1.default.to = email;
                mailer_1.default.subject = "Recuperação de senha";
                mailer_1.default.message = `Olá, ${user.name}. Entre com o código de recuperação: ${recoverPasswordCode} para cadastrar uma nova senha.`;
                mailer_1.default.sendEmail();
                return res.status(200).json({ message: "Token enviado com sucesso!" });
            }
            return res.status(204).json({ message: "Usuário não encontrado!" });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    async reset(req, res) {
        try {
            const { email, token, password } = req.body;
            const user = await this.userService.findByEmail(email);
            if (token !== user.passwordResetToken)
                return res.status(400).json({ message: "Token inválido!" });
            const now = new Date();
            if (now > user.passwordResetExpires)
                return res
                    .status(400)
                    .json({ message: "Token expirado. Gere um novo!" });
            const saltRounds = 10;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            await this.userService.update(user.id, Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return res
                .status(200)
                .json({ message: "Nova senha cadastrada com sucesso!" });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
}
exports.default = new AuthController();
