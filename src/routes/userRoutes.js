const express = require("express");
const usersController = require("../controllers/userController")
const verifyToken = require("../middleware/auth/authMiddleware");
const router = express.Router();

router.get('/',verifyToken,usersController.getUsers)
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUserById);
router.post("/:id", usersController.deleteUser);

module.exports = router;
