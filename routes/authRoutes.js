const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
require("../config/passport");

const router = express.Router();

router.get("/login", authController.getLogin);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

//need to improve later.
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("createpost");
  }
);

module.exports = router;
