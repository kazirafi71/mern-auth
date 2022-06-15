const router = require("express").Router();
const {
  register__Controller,
  googleLogin__controller,
  login__controller,
} = require("../controllers/authControllers");

router.post("/register", register__Controller);
router.post("/google-login", googleLogin__controller);
router.post("/login", login__controller);

module.exports = router;
