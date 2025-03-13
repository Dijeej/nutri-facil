import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDB = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("Erro: MONGO_URI não está definida ou está vazia!");
        return;
    }
    console.log(mongoUri)
    mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB Atlas conectado."))
    .catch((erro) => console.log(erro));
};

export { connectToDB };