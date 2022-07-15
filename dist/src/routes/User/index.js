"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../controllers/UserController"));
const Authorization_1 = __importDefault(require("../../middlewares/Authorization"));
const routes = express_1.default.Router();
/**
 * @openapi
 * /auth/reset-password:
 *  post:
 *   tags:
 *    - User
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
routes.post("/users", Authorization_1.default.authenticate, (req, res) => UserController_1.default.store(req, res));
routes.get("/users", Authorization_1.default.authenticate, (req, res) => UserController_1.default.index(req, res));
routes.get("/users/:id", Authorization_1.default.authenticate, (req, res) => UserController_1.default.findOne(req, res));
routes.put("/users/:id", Authorization_1.default.authenticate, (req, res) => UserController_1.default.update(req, res));
routes.delete("/users/:id", Authorization_1.default.authenticate, (req, res) => UserController_1.default.destroy(req, res));
exports.default = routes;
