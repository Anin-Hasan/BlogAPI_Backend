const express = require("express");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use(passport.session());

app.use("/", authRoutes);

app.listen(3000, () => console.log("app listening on port 3000!"));
