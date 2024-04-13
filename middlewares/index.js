const  validateJWT  = require('../middlewares/validateJwt.middleware');
const  validateRole = require('../middlewares/validateRole.middleware');
const  validateFields  = require('../middlewares/fieldValidator.middleware');


module.exports = {
    ...validateJWT,
    ...validateRole,
    ...validateFields
}