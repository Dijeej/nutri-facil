import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
// import mongoose from "mongoose";

class UserController {
     async getUserProfile(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                req.flash("error_msg", "Usuário não encontrado.");
                return res.redirect("/");
            }

            // Garantir que o ID do usuário seja tratado como um ObjectId
            // const userId = new mongoose.Types.ObjectId(user._id);

            // Filtrar receitas curtidas e adicionadas com o ID do usuário
            const recipesLiked = await Recipe.find({ likes: user._id });
            const recipesAdded = await Recipe.find({ idUser: user._id });

            // console.log('Receitas curtidas:', recipesLiked);
            // console.log('Receitas adicionadas:', recipesAdded);

             res.render("profile", { user, recipesAdded, recipesLiked });
        } catch (error) {
            console.error(error);
            req.flash("error_msg", "Erro ao carregar perfil.");
            res.redirect("/");
        }
    }
    singUpPage(req, res) {
        res.render("register", { layout: 'layoutRegister'})
    }
}

export { UserController };