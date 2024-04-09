const { response } = require('express');
const Role = require('../models/role');
const User = require('../models/user');


validateRoleDB  = async(role='') => {
        const existRole = await Role.findOne({ role });
        if(!existRole){
            throw new Error(`El rol: ${ role } no es un rol permitido`);
        }
    }

validateIfExistEmailDb = async(email='')=>{
     //Verificar si el email existe
     const existEmail = await User.findOne({ email });
     if( existEmail){
        throw new Error(`El email: ${ email } ya esta asociado con un usuario registrado`);
     }
 
}

module.exports = {
    validateRoleDB,
    validateIfExistEmailDb
}