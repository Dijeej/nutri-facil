import express from "express";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();

// Rota de registro
router.post("/signup/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            req.flash("error_msg", "Email já cadastrado.");
            return res.redirect("/signup");
        }

        user = new User({ name, email, password });
        await user.save();

        req.flash("success_msg", "Cadastro realizado! Faça login.");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário.");
    }
});

// Rota de login
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true
}), (req, res) => {
    // Agora o redirecionamento inclui o ID do usuário
    res.redirect(`/perfil/${req.user._id}`);
});

// Rota de logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success_msg", "Você saiu da conta.");
        res.redirect("/");
    });
});

router.get("/test-auth", (req, res) => {
    console.log("Usuário autenticado:", req.user);
    if (req.user) {
        res.json({ message: "Usuário autenticado", user: req.user });
    } else {
        res.json({ message: "Nenhum usuário autenticado" });
    }
});

export default router;
