const {Router} = require('express');
const accountController = require('./Controllers/accountController')

const routes = Router();

routes.post('/', accountController.init);
routes.post('/deposit', accountController.deposit);

module.exports = routes;