const authService = require("../services/authService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getLogin = (req, res) => {
  res.render("login");
};
exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  //   console.log(req.body);
  try {
    const user = await authService.register(req.body);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ msg: "Username and password are required." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    // console.log(user);
    if (!user) {
      res.status(401).send({ msg: "No user Found." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).send({ msg: "Incorrect Passowrd." });
    }
    const payload = {
      username,
      id: user.id,
    };
    const token = jwt.sign(payload, "random-string", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    // console.log("logged in nicely", token);
    return res.status(200).send({
      success: true,
      message: "loggedIn nicely",
      token: "Bearer " + token,
    });
  } catch (error) {
    console.log(error);
  }
};
