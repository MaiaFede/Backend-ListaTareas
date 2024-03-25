import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI;
console.info(mongoURI);

mongoose.connect(mongoURI);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{
    console.info('BD conectada')
})