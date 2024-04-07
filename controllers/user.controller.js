const { request, response} = require('express');


const userGet = (( req = request,res = response)=>{

    //Desestructuracion de params
    const { q, name = 'no name', apiKey = ''} = req.query;

        res.json({
            msg:    'GET API Controller',
            q,
            name,
            apiKey
        });
    
});

const userPut = (( req = request,res = response)=>{

    const id = req.params.id;

    res.json({
        msg:    'PUT API Controller',
        id
    });

});

const userPost = (( req = request,res = response)=>{

    const body = req.body;

    res.json({
        msg:    'POST API Controller',
        body
    });

});

const userDelete = (( req = request,res = response)=>{
    res.json({
        msg:    'DELETE API Controller'
    });

});

const userPatch = (( req = request,res = response)=>{
    res.json({
        msg:    'PATCH API Controller'
    });

});

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}