const express = require("express");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());

app.use("/", authRoutes);
app.use("/", fileRoutes);

app.listen(3000, () => console.log("app listening on port 3000!"));
