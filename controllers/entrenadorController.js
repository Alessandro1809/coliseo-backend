import Entrenador from "../models/entrenador.js";
import generateJWT from "../helpers/JWTGenerate.js";
import generateId from "../helpers/idGenerate.js";
import emailRegistry from "../helpers/emailRegister.js";
import emailForgot from "../helpers/emailForgotPass.js";
//Users registry
const register= async(req,res)=>{
     //avoid duplicate users
     const {email, nombre}= req.body;

     const usuarioExistente = await Entrenador.findOne({email});

     if (usuarioExistente) {
        const error = new Error('Usuario registrado previamente.');
        return res.status(400).json({msg:error.message});
     }
     
     //Save data en mongoDB
    try {
       
        const entrenador = Entrenador(req.body);
        const entrenadorRegistrado= await entrenador.save();
        
        //send a email of registry
        emailRegistry({
            email,
            nombre,
            token:entrenadorRegistrado.token
        });

        res.json(entrenadorRegistrado);
    } catch (error) {
        res.json({error:`Error en: ${error.message}`});
    }
}

//profile data
const profile=async(req,res)=>{
    const {entrenador}=req;
    return res.json({perfil:entrenador});
    
}

//confirm an account
const confirm= async(req,res)=>{
    //obtain token from url
    const {token} = req.params;
   
    const confirmarUsuario= await Entrenador.findOne({token});

    if (!confirmarUsuario) {
        const error = new Error('El token no es valido');
        return res.status(404).json({msg:error.message});
    }
    try {
        //modify data and save changes
        confirmarUsuario.token=null;
        confirmarUsuario.confirmado=true;
        await confirmarUsuario.save();
        res.json({msg:"Usuario confirmado correctamente"});
    } catch (error) {
        console.log(error);
    }
    
}

const authenticate = async(req, res)=>{
   const {email, password}=req.body;
   //If user exist
   const user = await Entrenador.findOne({email});

   if (!user) {
    const error = new Error('El usuario no existe revisa tus credenciales');
    return res.status(404).json({msg:error.message});
   }
   // if user is confirm
   if (!user.confirmado) {
    const error= new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({msg:error.message});
   }
   //authenticate
   if (await user.verifyPassword(password)) {
    //verify JWT
    res.json({token: generateJWT(user.id)});

   }else{
    const error = new Error('Contraseña incorrecta');
    return res.status(404).json({msg:error.message});
   }
   res.json({msg:"Autenticado"})
}

//forgot password function
const forgotPassword = async(req, res)=>{
    const {email}= req.body;
    const existUser = await Entrenador.findOne({email});
    //if user not exist
    if (!existUser) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg:error.message});
    }
    //if exist generate a new token and save
    try {
        existUser.token = generateId();
        await existUser.save();
        
        //Send instruction for generate a new pass
        emailForgot({
            email,
            nombre:existUser.nombre,
            token:existUser.token
        });

        return res.json({msg:'Hemos enviado un email con las instrucciones para reestablecer tus credenciales'});
    } catch (error) {
        console.log(error);
    }
}

//verify token by email
const verifyToken = async (req, res)=>{
    const {token}= req.params;
    const validToken= await Entrenador.findOne({token});

        if (validToken) {
            res.json({msg:'Token valido, el usuario existe!'})
        }else{
            const error = new Error('El token no es valido');
            return res.status(400).json({msg:error.message});
        }
    
}

//generate a new password
const newPassword = async (req, res)=>{
    const {token}= req.params;
    const {password}= req.body;

    const entrenador = await Entrenador.findOne({token});

    if (!entrenador) {
        const error = new Error('Hubo un error!');
        return res.status(400).json({msg:error.message})
    }

    try {
        entrenador.token=null;
        entrenador.password=password;
        await entrenador.save();
        res.json({msg:'Contraseña actualizada correctamente!'})
    } catch (error) {
        console.log(error);
    }

}

export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    verifyToken,
    newPassword
}