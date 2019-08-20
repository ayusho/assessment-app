var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./studentController');

router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);

router.route('/:id/assign')
    .put(controller.assignAssessment)

router.route('/:id/unassign')
    .put(controller.unassignAssessment)

router.route('/submit')
    .post(controller.submitAssessment)


module.exports = router;