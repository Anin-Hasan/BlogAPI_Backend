const express = require("express");
const fileController = require("../controllers/fileController");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/createpost", isAuth, fileController.createPostGet);
router.post("/createpost", fileController.postNewPost);
router.get("/posts", fileController.getPosts);

module.exports = router;
