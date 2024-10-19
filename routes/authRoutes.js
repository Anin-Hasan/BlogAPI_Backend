const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
require("../config/passport");

const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({ msg: "hey from protected" });
  }
);

module.exports = router;