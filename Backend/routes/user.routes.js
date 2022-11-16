const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
