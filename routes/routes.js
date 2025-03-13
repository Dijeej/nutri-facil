import Router from "express";
import { RecipeController } from "../controller/RecipeController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const routes = Router();
const recipeController = new RecipeController();

// Rota pública (buscar receitas)
routes.get("/", recipeController.getRecipesByDate);
routes.get("/recipes", recipeController.getAll);
routes.get("/receita/:id", recipeController.getRecipeById);

// Rotas protegidas (precisam de login)
routes.post("/create", ensureAuthenticated, recipeController.createRecipe);
routes.post("/update/:id", ensureAuthenticated, recipeController.updateRecipe);
routes.delete("/delete/:id", ensureAuthenticated, recipeController.deleteRecipe);

export { routes };