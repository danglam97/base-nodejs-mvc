const express = require("express");
const usersController = require("../controllers/userController")

const router = express.Router();

router.get('/',usersController.getUsers)
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUserById);
router.post("/:id", usersController.deleteUser);

module.exports = router;
