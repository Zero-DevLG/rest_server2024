express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        // Inicializacion Middlewares
        this.middlewares();
        // Inicializacion Routes
        this.routes();
    }

    //Middlewares

    middlewares()
    {
        // CORS 
        this.app.use( cors() );
        //Read/Parse Body
        this.app.use( express.json() );
        //Public Directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersRoutePath,require('../routes/user.routes'));
    }

   
  

    runServer(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en puerto ${ this.port }`.bgGreen);
        })
    }

}

module.exports = Server;