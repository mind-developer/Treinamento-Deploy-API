import express, { json, urlencoded } from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./src/routes/index";
import db from "./src/database/db";
import 'dotenv/config'

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

const swaggerDocs = swaggerJSDoc(swaggerOptions);
const app = express();
const port = process.env.PORT;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, async () => {
  // await db.sync();
  console.log(`Server running on ${process.env.APP_URL}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ Hello: "API" });
});

app.use("/", routes);
