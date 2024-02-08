//configuracion del servidor
import express from 'express';
import dotenv from 'dotenv';
import rutasEntrenador from './routes/rutasEntrenador.js';
import rutasCliente from './routes/rutasCliente.js';
import cors from 'cors';
import Entrenador from './models/entrenador.js';
import generateId from './helpers/idGenerate.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as Oauth2Strategy } from 'passport-google-oauth2';
//conexion a la base de datos
import connectDataBase from './config/db.js';
const app = express();
app.use(express.json());
//reading environment variables
dotenv.config();

connectDataBase();

const clientid = process.env.G_CLIENT_ID;
const clientsecret =process.env.G_CLIENT_SECRET;

const dominiosPermitidos=[process.env.FRONTEND_URL,'http://localhost:4000'];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
            // El origen es válido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));


app.use(session({
    secret:generateId(),
    resave:false,
    saveUninitialized: true,
    credentials:true
}));

// User login with google
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new Oauth2Strategy({
        clientID: clientid,
        clientSecret:clientsecret,
        callbackURL:'http://localhost:4000/api/entrenador/auth/google/callback',
        scope:['profile','email']
    },
    async (accessToken,refreshToken,profile,done)=>{
        try {
            let user = await Entrenador.findOne({googleId:profile.id});
            if (!user) {
                user = new Entrenador({
                    googleId:profile.id,
                    nombre:profile.displayName,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    password:generateId(),
                    image:profile.photos[0].value
                });
                await user.save();
            }
            return done(null,user)
        } catch (error) {
            return done(error,null);
        }
    }
    )
);

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});


app.use('/api/entrenador', rutasEntrenador );
app.use('/api/cliente', rutasCliente );
const PORT = process.env.PORT || 4000;
//server PORT
app.listen(PORT,()=>console.log(`Servidor funcionando el el puerto ${PORT}`));