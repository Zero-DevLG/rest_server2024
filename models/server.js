express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        this.authRoutePath = '/api/auth';
        //Connection DB
        this.conectarDb();
        // Inicializacion Middlewares
        this.middlewares();
        // Inicializacion Routes
        this.routes();
    }

    //DB Init Connection
    async conectarDb() {
        await dbConnection();
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
        this.app.use(this.authRoutePath,require('../routes/auth.routes'));
    }

   
  

    runServer(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en puerto ${ this.port }`.bgGreen);
        })
    }

}

module.exports = Server;