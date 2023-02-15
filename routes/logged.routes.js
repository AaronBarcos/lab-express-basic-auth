const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/logged-middlewares") 

router.get("/main", isLoggedIn, (req, res, next) => {
    res.render("private/main.hbs")
})

router.get("/private", isLoggedIn, (req, res, next) => {
    res.render("private/private.hbs")
})

module.exports = router;