const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateRoleDB, validateIfExistEmailDb, validateIfExistUser } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/fieldValidator.middleware');


const router = Router();

router.post('/login', [
   
    check('email','El correo es obligatorio').notEmpty(),
    check('email').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validateFields
], login);


router.post('/google', [
   
    check('id_token','id_token es necesario').notEmpty(),
    validateFields
], googleSignIn);

module.exports = router;