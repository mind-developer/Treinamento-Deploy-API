"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const routes = express_1.default.Router();
// AuthController
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
routes.post("/auth/login", AuthController_1.default.login);
/**
 * @openapi
 * /auth/reset-password:
 *  post:
 *   tags:
 *    - Auth
 *   summary: Reinicia a senha do usuário
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
routes.post("/auth/reset-password", AuthController_1.default.resetPassword);
// UserController
/**
 * @openapi
 * /users:
 *  get:
 *   tags:
 *    - User
 *   summary: Recebe todos os usuários
 *   description: ""
 *   responses:
 *      200:
 *        description: OK
 */
routes.post("/users", UserController_1.default.index);
routes.get("/users", UserController_1.default.index);
routes.get("/users/:id", UserController_1.default.index);
routes.put("/users/:id", UserController_1.default.index);
routes.delete("/users/:id", UserController_1.default.index);
exports.default = routes;
