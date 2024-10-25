const express = require("express");
const fileController = require("../controllers/fileController");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", fileController.getHome);

router.get("/createpost", isAuth, fileController.createPostGet);
router.post("/createpost", isAuth, fileController.postNewPost);
router.get("/posts", isAuth, fileController.getPosts);
// router.get("/posts/:id", isAuth);

module.exports = router;
