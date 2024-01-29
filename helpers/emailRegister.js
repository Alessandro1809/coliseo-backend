import nodemailer from 'nodemailer'


const emailRegistry= async (data)=>{

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });


      //send email
      const {email, nombre, token}=data;

      const info =await transporter.sendMail({
        from:"Coliseo Gym",
        to:email,
        subject:"Verifica tu cuenta en Coliseo Gym",
        text:"¡Felicidades te has registrado correctamente en Coliseo Gym, ahora verifica tu cuenta para finalizar tu registro!",
        html: `<p> Hola ${nombre} nos Alegra que formes parte de nuestro equipo, en este momento está todo listo, al verificar tu cuenta podrás iniciar sesión, bienvenido! </p>
        <p>Ahora debes seguir el siguiente enlace:  
        <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Verificar Cuenta </a></p>
        
        <p>Si no has creado una cuenta con nosotros, no te preocupes, haz caso omiso a este mensaje</p>
        `
      });

      console.log("Mensaje enviado %s", info.messageId)

}


export default emailRegistry;