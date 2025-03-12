import Recipe  from "../models/Recipe.js";

let message = "";
let type = "";

class RecipeController {
    async getAll(req, res) {
        try{
            setTimeout(() => {
                message = "";
                type = "";
            }, 2000);
            const recipesList = await Recipe.find();
            return res.render("index", {
                recipesList, 
                recipe: null, 
                recipeDelete: null,
                message, 
                type
            });
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async createRecipe (req, res) {
        const recipe = req.body;
        if(!recipe) {
            message = "Insira alguma tarefa antes de adicionar";
            type = "danger";
            return res.redirect("/");
        } 
        try {
            await Recipe.create(recipe);
            message = "Tarefa adicionada com sucesso";
            type = "success";
            return res.redirect("/"); 
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async getById (req, res) {
        try {        
            const recipe = await Recipe.findOne({_id: req.params.id});
            const recipesList = await Recipe.find();
            if (req.params.method === "update") {
                res.render("index", {
                    recipe, 
                    recipeDelete: null, 
                    recipesList,
                    message, 
                    type
                });
            } else {
                res.render("index", {
                    recipe: null, 
                    recipeDelete: recipe, 
                    recipesList,
                    message,
                    type
                });
            }
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async updateRecipe (req, res) {
        try {
            const recipe = req.body 
            await Recipe.updateOne({_id: req.params.id }, recipe);
            message = "Tarefa alterada com sucesso";
            type = "success"
            res.redirect("/");
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async deleteRecipe (req, res) {
        try {
            await Recipe.deleteOne({_id: req.params.id});
            message = "Tarefa apagada com sucesso";
            type = "success";
            res.redirect("/");
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

}

export { RecipeController };