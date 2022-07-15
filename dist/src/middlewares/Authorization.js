"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthConfig_1 = __importDefault(require("../config/AuthConfig"));
class Authorization {
    async authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return res.status(401).send({ message: "Nenhum token providenciado" });
            const tokenParts = authHeader.split(" ");
            if (!(tokenParts.length === 2))
                return res.status(401).send({ message: "Erro no token" });
            const [scheme, token] = tokenParts; // scheme = 'Bearer ' e token = token
            if (!/^Bearer$/i.test(scheme))
                return res.status(401).send({ message: "Token mal-formatado" });
            jsonwebtoken_1.default.verify(token, AuthConfig_1.default.secret, (e, decoded) => {
                // decoded = token do usuário
                if (e)
                    return res.status(401).send({ message: "Token inválido" });
                req.userId = decoded.id;
                return next();
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = new Authorization();
