const { request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const user = require('../models/user');



const userGet = async ( req = request,res = response)=>{

    //Desestructuracion de params
    //const { q, name = 'no name', apiKey = ''} = req.query;
    const { limit = 5 , init = 0} = req.query;
    // const users = await 
    // const countRegisters = await User.countDocuments({ status:true });

    const [ total, users ] = await Promise.all([
        User.countDocuments({ status:true }),
        User.find( {status: true} ).limit(Number(limit))
            .skip(Number(init))
    ])

        res.json({
          total,
          users
        });
    
};

const userPut = async( req = request,res = response)=>{

    const id = req.params.id;

    const { password, google, email , ...data} = req.body;

    //VALIDAR CONTRA LA BASE DE DATOS
    if(password){
        
          //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10); // Numero de ciclos de encrsiptacion
        user.password = bcryptjs.hashSync( password, salt ); 
    }

    const userUpdate = await User.findByIdAndUpdate( id, data );

    res.json({
        userUpdate
    });

};

const userPost = async( req = request,res = response)=>{

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password , role } );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10); // Numero de ciclos de encrsiptacion
    user.password = bcryptjs.hashSync( password, salt ); 

    //Guardar en la DB
    await user.save();

    res.json({
        msg:    'POST API Controller',
        user
    });

};

const userDelete = async( req = request,res = response)=>{

    const  {id }  = req.params;

    const user = await User.findByIdAndUpdate(id,{ status: false });


    res.json({
        user
    });

};

const userPatch = ( req = request,res = response)=>{
    res.json({
        msg:    'PATCH API Controller'
    });

};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}