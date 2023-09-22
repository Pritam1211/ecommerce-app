const { register, login } = require("../controllers/auth.controller");
const { jwtMiddleware, adminMiddleware } = require("../middleware/auth.middleware");

const router = require("express").Router();


router.post("/register", register);

router.post("/login", login);

router.get("/user-route", jwtMiddleware, (req,res) =>{
  res.status(200).json({ success: true });
});

router.get("/admin-route", adminMiddleware, (req,res) =>{
  res.status(200).json({ success: true });
});


module.exports = router;