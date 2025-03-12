import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import { routes } from "./routes/routes.js";
import { connectToDB } from "./database/db.js";

connectToDB();
const server = express();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 

// Configuração do motor EJS
server.set("view engine", "ejs");

// Configuração do diretório de views
server.set("views", path.join(__dirname, "views"));

// Usando expressLayouts sem o configure
server.use(expressLayouts);

server.use(express.json());
server.use(express.urlencoded({ extended: true })); 
server.use(express.static(path.resolve("public")));

server.use(routes);
server.use(
    "/bootstrap-icons",
    express.static(path.resolve("node_modules/bootstrap-icons/font"))
);

server.listen(3000, () => console.log("Servidor rodando em http://localhost:3000/"));
