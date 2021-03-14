if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();

// Connect to MongoDB
require("./src/Mongoose/dbConnector").connect();

// Configs
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const Test = require("./Models/Test");
const Question = require("./Models/Question");
const LoginCode = require("./Models/LoginCode");

// Routers
const testRouter = require("./routes/Test");

app.use("/test", testRouter);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
