import express from 'express'
import {
  getClients,
  addClient,
  getClient,
  updateClient,
  deleteClient
} from '../controllers/clienteController.js'
import checkAuth from '../middleware/authmiddleware.js'
const router = express.Router()

router.route('/')
  .post(checkAuth, addClient)
  .get(checkAuth, getClients)

router.route('/:id')
  .get(checkAuth, getClient)
  .put(checkAuth, updateClient)
  .delete(checkAuth, deleteClient)

export default router
