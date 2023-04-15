require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const linkRoutes = require("./routes/link.js");

const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routes middleware
app.use("/api", authRoutes);
app.use("/api", linkRoutes);

app.listen(8000, () => console.log("Server is running on port 8000"));
