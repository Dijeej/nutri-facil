import Recipe from "../models/Recipe.js";

let message = "";
let type = "";

class RecipeController {
    async getAll(req, res) {
        try {
            setTimeout(() => {
                message = "";
                type = "";
            }, 2000);
    
            const { search, category } = req.query; 
    
            let filter = {};
    
            if (search) {
                filter.title = { $regex: search, $options: "i" }; 
            }
            
            if (category) {
                filter.category = category; 
            }
    
            const recipesList = await Recipe.find(filter);
    
            return res.render("recipes", {
                recipesList,
                recipe: null,
                recipeDelete: null,
                message,
                type,
                layout: 'layout'  // Aplica o layout
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    async getRecipesByDate(req, res) {
        try {
            const { startDate, endDate } = req.query; // Pegando as datas de filtro da query
            
            let filter = {};

            if (startDate && endDate) {
                // Filtra receitas com base nas datas fornecidas
                filter.date = {
                    $gte: new Date(startDate),  // Data de início
                    $lte: new Date(endDate)     // Data de fim
                };
            }

            const recipesList = await Recipe.find(filter);  // Encontrando receitas com filtro de data

            // Retorna as receitas filtradas para a página
            return res.render("index", {
                recipesList,
                recipe: null,
                recipeDelete: null,
                message,
                type,
                layout: 'layout'  // Aplica o layout
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    async createRecipe(req, res) {
        const recipe = req.body;
        if (!recipe || !recipe.title || !recipe.ingredients || !recipe.preparation) {
            message = "Insira todos os campos para adicionar uma receita.";
            type = "danger";
            return res.redirect("/");
        }

        try {
            await Recipe.create(recipe);
            message = "Receita adicionada com sucesso!";
            type = "success";
            return res.redirect("/"); 
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async getById(req, res) {
        try {        
            const recipe = await Recipe.findOne({_id: req.params.id});
            const recipesList = await Recipe.find();

            if (req.params.method === "update") {
                res.render("index", {
                    recipe, 
                    recipeDelete: null, 
                    recipesList,
                    message, 
                    type,
                    layout: 'layout'  // Aplica o layout
                });
            } else {
                res.render("index", {
                    recipe: null, 
                    recipeDelete: recipe, 
                    recipesList,
                    message,
                    type,
                    layout: 'layout'  // Aplica o layout
                });
            }
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async getRecipeById(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id);

            if (!recipe) {
                message = "Receita não encontrada!";
                type = "danger";
                return res.redirect("/");
            }

            res.render("recipeDetail", {
                recipe,
                message,
                type,
                layout: 'layout'  // Aplica o layout
            });
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async updateRecipe(req, res) {
        try {
            const recipe = req.body;
            await Recipe.updateOne({_id: req.params.id }, recipe);
            message = "Receita alterada com sucesso!";
            type = "success";
            res.redirect("/");  // Isso renderiza a página com o layout por padrão
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async deleteRecipe(req, res) {
        try {
            await Recipe.deleteOne({_id: req.params.id});
            message = "Receita apagada com sucesso!";
            type = "success";
            res.redirect("/");  // Isso renderiza a página com o layout por padrão
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }
}

export { RecipeController };
