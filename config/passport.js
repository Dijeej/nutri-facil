import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

// Estratégia de login
passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: "Usuário não encontrado" });

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return done(null, false, { message: "Senha incorreta" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serializa o usuário na sessão
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Desserializa o usuário da sessão
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;