import Cliente from '../models/cliente.js'

const addClient = async(req, res)=>{

    const cliente = Cliente(req.body);
    cliente.entrenador=req.entrenador._id;
    console.log(cliente);
    try {
        const registerClient= await cliente.save();
        return res.json(registerClient);
    } catch (error) {
        console.log(error);
    }
}
const getClients = async (req, res)=>{

 try {
    
    const client = await Cliente.find().where('entrenador').equals(req.entrenador);

    res.json(client);
 } catch (error) {
    console.log(error);
 }
}

const getClient= async (req, res)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);

   try {

    if (!cliente) {
        return  res.status(404).json({msg:"Cliente no encontrado"})
       }

    if (cliente.entrenador._id.toString() !== req.entrenador._id.toString()) {
        return  res.json({msg:"Acción no valida"})
     }

    res.json(cliente);
     

   } catch (error) {
    console.log(error)
   }

}


const updateClient= async (req, res)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);
    if (!cliente) {
        return  res.status(404).json({msg:"Cliente no encontrado"})
       }
      
      if (cliente.entrenador._id.toString() !== req.entrenador._id.toString()) {
          return  res.json({msg:"Acción no valida"})
       }

      cliente.nombre =req.body.nombre || cliente.nombre;
      cliente.apellido =req.body.apellido || cliente.apellido;
      cliente.edad =req.body.edad || cliente.edad;
      cliente.email =req.body.email || cliente.email;
      cliente.peso =req.body.peso || cliente.peso;
      cliente.plan =req.body.plan || cliente.plan;
      cliente.pago =req.body.pago || cliente.pago;
      cliente.telefono =req.body.telefono || cliente.telefono;
      cliente.fecha =req.body.fecha || cliente.fecha;

   try {
      //update client  
      const updatedClient = await cliente.save();
      res.json(updateClient);
    
    }catch(error){
        console.log(error)   
        }
}


const deleteClient= async (req, res)=>{
    const {id} = req.params;
    const cliente = await Cliente.findById(id);
    if (!cliente) {
        return  res.status(404).json({msg:"Cliente no encontrado"})
       }
      
      if (cliente.entrenador._id.toString() !== req.entrenador._id.toString()) {
          return  res.json({msg:"Acción no valida"})
       }
      try {
        await cliente.deleteOne();
        res.json({msg:"Cliente eliminado correctamente"})
      } catch (error) {
        console.log(error)
      } 
}

export {
    addClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}