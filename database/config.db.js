const mongoose = require('mongoose');
require('colors');


const dbConnection = async()=>{

    try {

        await mongoose.connect( process.env.MONGODB_CNN + '/cafe_db',{
        });

        console.log(`Base de datos Online`.bgBlue);
        
    } catch (error) {
        console.error(`Error en la conexión a la DB: ${error} `.bgRed);
        throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConnection
}