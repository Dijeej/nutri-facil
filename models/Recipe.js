import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true },  // Pode ajustar o tipo de quantity conforme necessário
        }
    ],
    preparation: {
        type: String, 
        required: true,
    },
    img: {
        type: String, 
        required: true,
    },
    _idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
        },
    ],
    preparationTime: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

export default mongoose.model("Recipe", recipeSchema);
