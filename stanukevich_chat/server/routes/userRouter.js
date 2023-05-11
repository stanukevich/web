const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")

router.post("/register", userController.registration)
router.post("/login", userController.login)
router.get("/getMessages", userController.getMessages)
router.post("/createMessage", userController.createMessage)
router.post("/getAuthUser", userController.getAuthUser)
router.post("/deleteMessage", userController.deleteMessage)

module.exports = router