import mongoose, {Schema} from "mongoose";

const tareaSchema = new Schema({
    nombreTarea:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        unique:true
    }

})