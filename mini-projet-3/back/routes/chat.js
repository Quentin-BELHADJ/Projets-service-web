const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const chatController = require("../controllers/chatController");

router.get("/:user1/:user2", isAuthenticated, chatController.getMessagesBetweenUsers);

module.exports = router;
