import express from "express";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();

// Rota de registro
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            req.flash("error_msg", "Email já cadastrado.");
            return res.redirect("/register");
        }

        user = new User({ name, email, password });
        await user.save();

        req.flash("success_msg", "Cadastro realizado! Faça login.");
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário.");
    }
});

// Rota de login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

// Rota de logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success_msg", "Você saiu da conta.");
        res.redirect("/login");
    });
});

export default router;
