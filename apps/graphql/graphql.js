require("dotenv-flow").config({
  path: "./config",
});

const serverless = require("serverless-http");

const app = require("./app");

exports.handler = serverless(app, {
  basePath: "/.netlify/functions",
});
