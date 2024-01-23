import mongoose from 'mongoose';
//conexion a mongoDB
const connectDataBase= async ()=>{
    try {
        const connectDB = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        const url= `${connectDB.connection.host}:${connectDB.connection.port}`;
        console.log(`Mongo db conectado en : ${url}`)
    } catch (error) {
       console.log(`error: ${error.message}`);
       process.exit(1);
    }
};

export default connectDataBase;