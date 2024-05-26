const { response , request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/generateJWT');
const { googleVerifySign } = require('../helpers/googleVerify');
const user = require('../models/user');
 

const login = async(req = request , res = response)=>{

    const { email , password } = req.body;

    try {

        //Verifcar si el emial existe
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                email,
                password,
                msg: 'Usuario/Password Incorrectos ---- email existe'
            });
        }
        // Si el usuario esta activo
  
        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario/Password Incorrectos ---- Usuario activo'
            });
        }
        //Verificar el password
        const validPassword = bcryptjs.compareSync( password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Password Incorrectos --- Password'
            });
        }

        //Generar el JWT
        const token =  await generateJwt(user.id);

        return res.json({
            user,
            token,
            msg: 'Login ok'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor, Contacte al administrador'
        });
    }

    res.json({
       
        msg: ' Login '
    })

}


const googleSignIn = async( req = request, res=response)=>{
    
    const { id_token } = req.body;

    try {
        const { name, picture , email } = await googleVerifySign( id_token );

        
       let user = await User.findOne({ email });

        if(!user){
            // Nuevo registro user
            const data = {
                name:       name,
                email:      email,
                password:   ':P',
                img:        picture,
                google:     true
            }

            user = new User( data );
            await user.save();

        }

        // Verificacion de inhabilitacion de usuario

        if(!user.status){
            return res.status(400).json({
                ok:     false,
                msg:    'Favor de contactar con el administrador, Usuario Inhabilitado'
            });
        }

        // Creacion del JWT

        const token = await  generateJwt(user.uid);

    


       
        res.status(200).json({
            ok:         true,
            msg:        'Usuario verificado con exito',
            user,
            token
          
        
        });
       
    } catch (error) {
        res.status(400).json({
            ok:     false,
            msg:    'El Token no se pudo verificar',
            error:  error
        });
    }

    
};



module.exports = {
    login,
    googleSignIn
}