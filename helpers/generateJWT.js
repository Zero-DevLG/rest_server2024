const jwt = require('jsonwebtoken');
require('colors');

const generateJwt = ( uid = '') => {

    return new Promise ((resolve, reject )=>{

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:  '4h'
        },(err, token) =>{
            if(err){
                console.log(`${err}`.bgRed);
                reject(' No se pudo generar el token');
            }
            else{
                resolve(token);
            }
        } )

    });
}


module.exports = {
    generateJwt
}