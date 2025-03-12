import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], 
      required: true,
    },
    preparation: {
      type: String, 
      required: true,
      maxlength: 1000, 
    },
    img: {
      type: String, 
      required: true,
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
  });
  
  export default mongoose.model("Recipe", recipeSchema);