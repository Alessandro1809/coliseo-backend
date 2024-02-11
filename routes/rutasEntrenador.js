//Routing of Entrnador
import express from "express";
import checkAuth from "../middleware/authmiddleware.js";
import { register,
        profile,
        confirm,
        authenticate,
        forgotPassword,
        verifyToken,
        newPassword,
        googleAuth
      } from "../controllers/entrenadorController.js";
import passport from "passport";

const router = express.Router();

//public routes
router.post('/',register);
router.get('/verificar/:token', confirm);
router.post('/autenticar',authenticate);
router.post('/olvide-password', forgotPassword);
router.route('/olvide-password/:token').get(verifyToken).post(newPassword);

router.post('/google-registry',googleAuth);

//private routes
router.get('/perfil', checkAuth, profile);

export default router;