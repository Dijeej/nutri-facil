import Router from "express";
import { RecipeController } from "../controller/RecipeController.js";

const routes = Router();
const recipeController = new RecipeController();

// Rota para buscar todas as receitas
routes.get("/", recipeController.getRecipesByDate);
routes.get("/recipes", recipeController.getAll);

// Rota para criar uma nova receita
routes.post("/create", recipeController.createRecipe);

// Rota para exibir uma receita específica (com método de atualização ou exclusão)
routes.get("/getById/:id/:method", recipeController.getById);

// Rota para exibir uma receita específica
routes.get("/receita/:id", recipeController.getRecipeById);

// Rota para atualizar uma receita
routes.post("/update/:id", recipeController.updateRecipe);

// Rota para excluir uma receita
routes.get("/delete/:id", recipeController.deleteRecipe);

export { routes };
