import mongoose from 'mongoose'
// conexion a mongoDB se quito el objeto de configuracion debiodo a useNewUrlParser is a deprecated option as same useUnifiedTopology
const connectDataBase = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI)
    const url = `${connectDB.connection.host}:${connectDB.connection.port}`
    console.log(`Mongo db conectado en : ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDataBase
