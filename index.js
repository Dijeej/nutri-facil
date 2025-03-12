import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { routes } from "./routes/routes.js";
import { connectToDB } from "./database/db.js";

connectToDB();
const server = express();

server.set("view engine", "ejs");
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