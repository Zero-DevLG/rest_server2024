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

validateIfExistUser = async(id)=>{
    //Verificar si el email existe
    const existUser = await User.findById( id );
    if( !existUser){
       throw new Error(`El usuario con ID : ${ id } no existe`);
    }

}

module.exports = {
    validateRoleDB,
    validateIfExistEmailDb,
    validateIfExistUser
}