//configuracion del servidor
import express from 'express';
import dotenv from 'dotenv';
import rutasEntrenador from './routes/rutasEntrenador.js';
import rutasCliente from './routes/rutasCliente.js';
import cors from 'cors';

//conexion a la base de datos
import connectDataBase from './config/db.js';

const app = express();
app.use(express.json());
//reading environment variables
dotenv.config();

connectDataBase();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
            // El origen es válido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },

};

app.use(cors(corsOptions));


app.use('/api/entrenador', rutasEntrenador);
app.use('/api/cliente', rutasCliente);

const PORT = process.env.PORT || 4000;
//server PORT
app.listen(PORT, () => console.log(`Servidor funcionando el el puerto ${PORT}`));