const express = require('express');
const accountController = require('./Controllers/accountController');
const routes = express.Router();

routes.post('/account',accountController.create);
routes.post('/deposit',accountController.deposit);
routes.post('/withdraw',accountController.withdraw);
routes.get('/balance', accountController.balance);
routes.delete('/del', accountController.delete)


module.exports = routes;