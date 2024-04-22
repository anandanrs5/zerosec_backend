const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
app.use(express.json());
require("dotenv").config();
const port = 3000;
const db = require("./db");
const cors = require("cors");
app.use(cors());

const signup = require("./api/auth/signup");
app.use("/api/signup", signup);

const login = require("./api/auth/login");
app.use("/api/login", login);

const work_records = require("./api/user_time_track");
app.use("/api/tracking", work_records);


app.get("/", (req, res) => {
    res.send("App is running..");
});

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});