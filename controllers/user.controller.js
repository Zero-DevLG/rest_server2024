const { request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const userGet = ( req = request,res = response)=>{

    //Desestructuracion de params
    const { q, name = 'no name', apiKey = ''} = req.query;

        res.json({
            msg:    'GET API Controller',
            q,
            name,
            apiKey
        });
    
};

const userPut = ( req = request,res = response)=>{

    const id = req.params.id;

    res.json({
        msg:    'PUT API Controller',
        id
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

const userDelete = ( req = request,res = response)=>{
    res.json({
        msg:    'DELETE API Controller'
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