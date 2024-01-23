//configuracion del servidor
import express from 'express';
import dotenv from 'dotenv';
import rutasEntrenador from './routes/rutasEntrenador.js'
import rutasCliente from './routes/rutasCliente.js'
//conexion a la base de datos
import connectDataBase from './config/db.js';
const app = express();
app.use(express.json());
//lectura de las variables de emntorno
dotenv.config();

connectDataBase();

app.use('/api/entrenador', rutasEntrenador );
app.use('/api/cliente', rutasCliente );
const PORT = process.env.PORT || 4000;
//configuracion del puerto del server
app.listen(PORT,()=>console.log(`Servidor funcionando el el puerto ${PORT}`));