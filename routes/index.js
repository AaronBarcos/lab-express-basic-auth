const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes)

const loggedRoutes = require("./logged.routes.js");
router.use("/logged", loggedRoutes)

module.exports = router;
