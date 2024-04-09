const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fieldValidator.middleware');
const { validateRoleDB, validateIfExistEmailDb } = require('../helpers/dbValidators');


const router = Router();

 //Routes

 
    router.get('/', userGet);

    router.put('/:id',userPut);

    router.post('/', [ 
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria y debe de seer mayor a 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').not().isEmail(),
        check('email').custom(validateIfExistEmailDb),
        // check('role', 'No es un rol permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom( validateRoleDB ),
        validateFields
     ] ,userPost);

    router.delete('/',userDelete);

    router.patch('/',userPatch);


module.exports = router;