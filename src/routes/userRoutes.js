const express = require("express");
const usersController = require("../controllers/userController")

// const userController = require("../controllers/usersController");

const router = express.Router();

router.get('/',usersController.getListUser)


module.exports = router;










// router.get("/", userController.getUsers);
// router.get("/add", userController.showAddForm);
// router.post("/add", userController.createUser);
// router.get("/edit/:id", userController.showEditForm);
// router.post("/edit/:id", userController.updateUser);
// router.post("/delete/:id", userController.deleteUser);
