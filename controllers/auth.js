const { response , request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/generateJWT');


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



module.exports = {
    login
}