import nodemailer from 'nodemailer'


const emailForgot= async (data)=>{

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
        subject:"Reestablecimiento de crenciales",
        text:"Parece que has olvidado tus credenciales :(",
        html: `<p> Hola ${nombre} nos alegra que nos hayas solicitado la recuperación de tu cuenta, recuerda anotar tus contraseñas en un lugar seguro y no compartirlas con terceros.</p>
        <p>Ahora debes seguir el siguiente enlace y generar una nueva contraseña:  
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Credenciales </a></p>
        
        <p>Si no has creado una cuenta con nosotros, no te preocupes, haz caso omiso a este mensaje</p>
        `
      });

      console.log("Mensaje enviado %s", info.messageId)

}


export default emailForgot;