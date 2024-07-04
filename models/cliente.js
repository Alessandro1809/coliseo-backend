import mongoose from 'mongoose'

const clienteSchema = mongoose.Schema({

  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  edad: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  peso: {
    type: String,
    default: null
  },
  plan: {
    type: String,
    default: 'Basico',
    trim: true
  },
  pago: {
    type: Number,
    default: 'Basico',
    trim: true
  },
  telefono: {
    type: String,
    default: null,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now(),
    trim: true
  },
  entrenador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entrenador'
  }

},
{
  timestamps: true
}

)

const Cliente = mongoose.model('Cliente', clienteSchema)

// Export of instance Cliente
export default Cliente
