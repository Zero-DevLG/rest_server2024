const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fieldValidator.middleware');
const { validateRoleDB, validateIfExistEmailDb, validateIfExistUser } = require('../helpers/dbValidators');


const router = Router();

 //Routes

 
    router.get('/', userGet);

    router.put('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(validateIfExistUser),
        check('role').custom( validateRoleDB ),
        validateFields
     ],userPut);

    router.post('/', [ 
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria y debe de seer mayor a 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').not().isEmail(),
        check('email').custom(validateIfExistEmailDb),
        // check('role', 'No es un rol permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom( validateRoleDB ),
        validateFields
     ] ,userPost);

    router.delete('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(validateIfExistUser),
        validateFields
    ],userDelete);

    router.patch('/',userPatch);


module.exports = router;