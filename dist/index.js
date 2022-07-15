"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_1 = __importDefault(require("./src/routes/index"));
const db_1 = __importDefault(require("./src/database/db"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: "1.0.0",
            description: "",
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
            contact: {
                name: "Mind Consulting",
            },
            servers: [process.env.APP_URL],
        },
    },
    apis: ["src/routes/index.ts", "src/controllers/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"] }));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.listen(port, async () => {
    await db_1.default.sync();
    console.log(`Server running on ${process.env.APP_URL}`);
});
app.get("/", (req, res) => {
    res.status(200).json({ Hello: "API" });
});
app.use("/", index_1.default);
