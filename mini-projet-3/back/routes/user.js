const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, userController.getAllUsers);

module.exports = router;