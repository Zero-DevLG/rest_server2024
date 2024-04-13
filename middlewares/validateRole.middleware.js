const { request,  response } = require("express")


const validateRole = (req = request, res= response, next)=>{
    
    const userAuth = req.userAuth;

    if( !userAuth){
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }


    if(userAuth.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Usuario con permisos insuficientes para realizar la acción'
        });
    }
    next();
}

const validateRoles = (...roles)=>{

    return (req = request, res = response, next) => {
        const userAuth = req.userAuth;
        if( !userAuth){
            return res.status(500).json({
                msg: 'Error en el servidor'
            });
        }

        if( !roles.includes( userAuth.role) ){
            return res.status(401).json({
                msg: 'Usuario con permisos insuficientes para realizar la acción'
            });
        }

        next();
    }

    

}


module.exports = {
    validateRole,
    validateRoles
}