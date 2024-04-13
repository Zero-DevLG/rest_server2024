const jwt  = require('jsonwebtoken');
const { request, response } = require("express");
require('colors');

const User = require('../models/user');




const validateJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token');
    if( !token){
        return res.status(401).json({
            msg:    'Usuario no autorizado'
        });
    }

    try {

        //validamos jwt
        const { uid } =  jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        //Obtener la informacion del usario autenticado
        const user = await User.findById(uid);

        if(! user){
            return res.status(401).json({
                msg:   'Usuario no autorizado'
            });
        }

        if(! user.status){
            return res.status(401).json({
                msg:   'Usuario no autorizado'
            });
        }

        //console.log(`usuario autenticado: ${ user }`.bgCyan);

        req.userAuth = user; 

        next();
        
    } catch (error) {
        console.error(`Hubo un error: ${ error }}`.bgRed);
        return res.status(401).json({
            msg:    'Token no valido'
        });
    }
}


module.exports = {
    validateJWT
}