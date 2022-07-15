import express, { Request, Response } from "express";
import AuthController from "../../controllers/AuthController";

const routes = express.Router();

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
routes.post("/auth/login", (req: Request, res: Response) =>
  AuthController.login(req, res)
);
routes.post("/auth/forgot", (req: Request, res: Response) =>
  AuthController.forgot(req, res)
);
routes.post("/auth/reset", (req: Request, res: Response) =>
  AuthController.reset(req, res)
);
routes.post("/users/token", (req: Request, res: Response) =>
  AuthController.getUserByToken(req, res)
);

export default routes;
