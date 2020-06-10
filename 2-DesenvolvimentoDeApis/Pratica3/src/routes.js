const {Router} = require('express');
const routes = Router();
const gradeController = require('./Controllers/gradeController');

routes.post('/newGrade', gradeController.create);
routes.post('/updateGrade', gradeController.update);
routes.delete('/deleteGrade', gradeController.delete);
routes.get('/getById', gradeController.index_byId);
routes.get('/sumNotesSubject', gradeController.sumNotesSubject);
routes.get('/medSubjType', gradeController.medSubjType);
routes.get('/threeBests', gradeController.threeBestsByType);

module.exports = routes;