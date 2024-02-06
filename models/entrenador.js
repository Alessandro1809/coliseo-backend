import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generateId from "../helpers/idGenerate.js";

const entrenadorSchema = mongoose.Schema({
    googleId :{
        type:String,
    },
    DisplayName :{
        type:String,
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true, 
    },
    telefono:{
        type:String,
        required:false,
        trim:true
    },
    image:{
        type:String
    },
    token:{
        type:String,
        default:generateId()
    },
    confirmado:{
        type:Boolean,
        default:false
    }

});
//hashing passwords
entrenadorSchema.pre('save', async function(next){
    //If the password is already hash, dont hash again
    if(!this.isModified('password')){
        next();
    };

    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});


entrenadorSchema.methods.verifyPassword =async function(passwordForm){
    return await bcrypt.compare(passwordForm,this.password);
}

const Entrenador = mongoose.model("Entrenador", entrenadorSchema);


//Export of instance entrenador
export default Entrenador;