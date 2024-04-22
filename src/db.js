const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://worktimetracking:63zerosecrsa@cluster0.7pssvaa.mongodb.net/workstatus"
// const DB_URL = "mongodb://127.0.0.1:27017/workstatus";
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!!!");
});
