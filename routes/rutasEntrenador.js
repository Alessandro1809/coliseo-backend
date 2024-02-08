//Routing of Entrnador
import express from "express";
import checkAuth from "../middleware/authmiddleware.js";
import { register,
        profile,
        confirm,
        authenticate,
        forgotPassword,
        verifyToken,
        newPassword} from "../controllers/entrenadorController.js";
import passport from "passport";

const router = express.Router();

//public routes
router.post('/',register);
router.get('/verificar/:token', confirm);
router.post('/autenticar',authenticate);
router.post('/olvide-password', forgotPassword);
router.route('/olvide-password/:token').get(verifyToken).post(newPassword);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback for Google OAuth
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: `http://localhost:5173/admin`,
  failureRedirect: `${process.env.FRONTEND_URL}/`,
}));

router.get("/login/sucess",async(req,res)=>{

  if(req.user){
      res.status(200).json({message:"user Login",user:req.user})
  }else{
      res.status(400).json({message:"Not Authorized"})
  }
})

router.get("/logout",(req,res,next)=>{
  req.logout(function(err){
      if(err){return next(err)}
      res.redirect("http://localhost:3001");
  })
})

//private routes
router.get('/perfil', checkAuth, profile);

export default router;