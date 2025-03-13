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
        try {
            const recipe = req.body;
    
            // Verificar se todos os campos obrigatórios estão preenchidos
            if (
                !recipe ||
                typeof recipe.title !== "string" ||
                !Array.isArray(recipe.ingredients) ||
                recipe.ingredients.some(ingredient => typeof ingredient.name !== "string" || typeof ingredient.quantity !== "string") ||
                typeof recipe.preparation !== "string" ||
                typeof recipe.img !== "string" ||
                typeof recipe.preparationTime !== "string" ||
                typeof recipe.category !== "string"
            ) {
                req.flash("danger", "Insira todos os campos obrigatórios corretamente.");
                console.log("Erro: Campos obrigatórios não preenchidos corretamente.");
                return res.redirect("/recipe/add");
            }
    
            // Garantir que 'ingredients' seja um array de objetos válidos
            const isValidIngredients = recipe.ingredients.every(ingredient =>
                typeof ingredient === "object" &&
                typeof ingredient.name === "string" &&
                typeof ingredient.quantity === "string"
            );
            if (!isValidIngredients) {
                req.flash("danger", "Os ingredientes devem conter nome e quantidade.");
                return res.redirect("/recipe/add");
            }
            
            // Garantir que 'preparationTime' seja um número inteiro
            const preparationTime = parseInt(recipe.preparationTime, 10);
            if (isNaN(preparationTime) || preparationTime <= 0) {
                req.flash("danger", "O tempo de preparo deve ser um número válido.");
                return res.redirect("/");
            }
            // Criar e salvar a receita no banco de dados
            await Recipe.create({
                title: recipe.title,
                ingredients: recipe.ingredients.map(ingredient => ({
                    name: ingredient.name,
                    quantity: ingredient.quantity
                })),
                preparation: recipe.preparation,
                img: recipe.img,
                likes: recipe.likes,
                preparationTime,
                category: recipe.category,
                idUser: req.user.id
            });
    
            req.flash("success", "Receita adicionada com sucesso!");
            return res.redirect("/");
        } catch (err) {
            console.error("Erro ao adicionar receita:", error);
            req.flash("danger", "Erro ao adicionar a receita: " + err.message);
            return res.redirect("/");
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
    async getAddRecipePage(req, res) {
        try {
            res.render("recipeAdd", {
                message: "",
                type: "",
                layout: "layoutRegister"
            });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    async updateRecipe(req, res) {
        try {
            const recipe = req.body;
            await Recipe.updateOne({_id: req.params.id }, recipe);
            message = "Receita alterada com sucesso!";
            type = "success";
            res.redirect(`/perfil/${req.user.id}`);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    async deleteRecipe(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id);
            console.log(recipe);
            if (!recipe) {
                req.flash("danger", "Receita não encontrada!");
                return res.redirect(`/perfil/${req.user.id}`);
            }
    
            // Verificar se a receita pertence ao usuário
            if (recipe.idUser.toString() !== req.user.id) {
                req.flash("danger", "Você não tem permissão para excluir essa receita.");
                return res.redirect(`/perfil/${req.user.id}`);
            }
    
            await Recipe.deleteOne({ _id: req.params.id });
            req.flash("success", "Receita apagada com sucesso!");
            res.redirect(`/perfil/${req.user.id}`);
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: err.message });
        }
    }
}

export { RecipeController };
