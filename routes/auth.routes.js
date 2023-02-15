const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup-form.hbs");
});

router.post("/signup", async (req, res, next) => {
  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
      username: req.body.username,
      password: hashPassword,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

//GET ("/auth/login")
router.get("/login", (req, res, next) => {
  res.render("auth/login-form.hbs");
});

//POST ("/auth/login")
router.post("/login", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser === null) {
      res.render("auth/login-form.hbs", {
        errorMessage: "Ese usuario no existe.",
      });
      return;
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (correctPassword === false) {
        res.render ("auth/login-form.hbs",{
            errorMessage: "Contraseña incorrecta"
        })
        return
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
