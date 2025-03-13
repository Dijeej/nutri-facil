import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url"; 
import { dirname } from "path"; 
import session from "express-session";
import flash from "connect-flash";
import passport from "./config/passport.js";
import { routes } from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectToDB } from "./database/db.js";

connectToDB();
const server = express();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 

server.set("view engine", "ejs");

server.set("views", path.join(__dirname, "views"));

server.use(expressLayouts);

server.use(express.json());
server.use(express.urlencoded({ extended: true })); 
server.use(express.static(path.resolve("public")));

// Configuração da sessão
server.use(session({
    secret: "segredo_super_secreto",
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(flash());

server.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

server.use(routes);
server.use(authRoutes);

server.use(
    "/bootstrap-icons",
    express.static(path.resolve("node_modules/bootstrap-icons/font"))
);

server.listen(3000, () => console.log("Servidor rodando em http://localhost:3000/"));