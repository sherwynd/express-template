const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const port = process.env.PORT || 3000;
// const app = express()

const swaggerOptions = {
  definition: {
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Auth API for login and register",
      contact: "Sherwynd Liew Li-Yuan",
    },
    servers: ["http://localhost:3000"],
  },
  apis: ["./routers/*.js", , "./utils/auth.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
function swaggerDocs(app, port) {
  //Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  //Docs in JSON format
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });

  console.info(`Swagger Docs available at http://localhost:${port}/docs`);
}

module.exports = {
  swaggerDocs,
};
