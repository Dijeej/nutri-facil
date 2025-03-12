import Router from "express";
import { RecipeController } from "../controller/RecipeController.js";

const routes = Router();
const recipeController = new RecipeController();

routes.get("/", recipeController.getAll);
routes.post("/create", recipeController.createRecipe);
routes.get("/getById/:id/:method", recipeController.getById);
routes.post("/update/:id", recipeController.updateRecipe);
routes.get("/delete/:id", recipeController.deleteRecipe);

export { routes };