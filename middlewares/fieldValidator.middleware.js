const {  validationResult } = require('express-validator');
const { request, response} = require('express');




const validateFields= (req = request, res= response, next)=>{
     //Recibiendo errores de express-validation
     errors = validationResult(req );
     if(!errors.isEmpty()){
         return res.status(400).json(errors);
     }

     next();
}


module.exports = {
    validateFields
}