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
                layout: 'layout' 
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    async getRecipesByDate(req, res) {
        try {
    
            const allRecipes = await Recipe.find().sort({ createdAt: -1 });
    
            const mostLikedRecipes = [...allRecipes]
                .sort((a, b) => {
                    if (b.likes.length !== a.likes.length) {
                        return b.likes.length - a.likes.length;
                    }
                    return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .slice(0, 4);
    
            const latestRecipes = allRecipes.slice(0, 10);
    
            res.render("index", {
                latestRecipes,
                mostLikedRecipes,
                recipe: null,
                recipeDelete: null,
                message: null,
                type: null,
                layout: "layout"
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    async createRecipe(req, res) {
        const recipe = req.body;
    
        // Validando se os campos obrigatórios estão preenchidos
        if (!recipe || !recipe.title || !recipe.ingredients || !recipe.preparation || !recipe.img || !recipe.preparationTime || !recipe.category) {
            message = "Insira todos os campos obrigatórios para adicionar uma receita.";
            type = "danger";
            return res.redirect("/"); // Redireciona de volta para a página inicial com a mensagem de erro
        }
    
        // Garantir que o campo 'likes' seja um array vazio caso não seja passado
        if (!recipe.likes) {
            recipe.likes = [];
        }
    
        try {
            // Criar e salvar a receita no banco de dados
            await Recipe.create({
                title: recipe.title,
                ingredients: recipe.ingredients.split(','), // Convertendo a string de ingredientes para um array
                preparation: recipe.preparation,
                img: recipe.img,
                likes: recipe.likes, // Usando o array de likes fornecido
                preparationTime: parseInt(recipe.preparationTime), // Convertendo para inteiro
                category: recipe.category,
            });
    
            // Mensagem de sucesso
            message = "Receita adicionada com sucesso!";
            type = "success";
            return res.redirect("/"); // Redireciona para a página inicial com a mensagem de sucesso
        } catch (err) {
            // Tratamento de erro
            message = "Erro ao adicionar a receita: " + err.message;
            type = "danger";
            return res.redirect("/"); // Redireciona para a página inicial com a mensagem de erro
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

            res.render("recipe", {
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
