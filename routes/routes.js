import Router from "express";
import { RecipeController } from "../controller/RecipeController.js";
import { UserController } from "../controller/UserController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const routes = Router();
const recipeController = new RecipeController();
const userController = new UserController();

// Rota pública (buscar receitas)
routes.get("/", recipeController.getRecipesByDate);
routes.get("/recipes", recipeController.getAll);
routes.get("/receita/:id", recipeController.getRecipeById);
routes.get("/signup", userController.singUpPage);

// Rotas protegidas (precisam de login)
routes.post("/create", ensureAuthenticated, recipeController.createRecipe);
routes.post("/update/:id", ensureAuthenticated, recipeController.updateRecipe);
routes.delete("/delete/:id", ensureAuthenticated, recipeController.deleteRecipe);
routes.get("/perfil/:id", ensureAuthenticated, userController.getUserProfile);



export { routes };