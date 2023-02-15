const express = require("express")
const router = express.Router()
const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs")


router.get("/signup", (req, res, next) => {
    res.render("auth/signup-form.hbs")
})

router.post("/signup", async (req, res, next) => {
    
    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({
            username: req.body.username,
            password: hashPassword
        })
        res.redirect("/")
    } catch (error) {
        next(error);
    }
})

module.exports = router;