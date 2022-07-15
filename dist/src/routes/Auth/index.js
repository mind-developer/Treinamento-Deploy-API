"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../../controllers/AuthController"));
const routes = express_1.default.Router();
/**
 * @openapi
 * /auth/login:
 *  post:
 *   tags:
 *    - Auth
 *   summary: Realiza autenticação do usuário
 *   description: ""
 *   requestBody:
 *       required: true
 *       contents:
 *         application/json:
 *            schema:
 *                $ref: "#/components/schemas/LoginUser"
 *   responses:
 *      200:
 *        description: OK
 */
routes.post("/auth/login", (req, res) => AuthController_1.default.login(req, res));
routes.post("/auth/forgot", (req, res) => AuthController_1.default.forgot(req, res));
routes.post("/auth/reset", (req, res) => AuthController_1.default.reset(req, res));
routes.post("/users/token", (req, res) => AuthController_1.default.getUserByToken(req, res));
exports.default = routes;
