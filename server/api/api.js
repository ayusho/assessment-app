var router = require('express').Router();

router.use('/teacher', require('./teacher/teacherRoutes'));
router.use('/student', require('./student/studentRoutes'));
router.use('/assessment', require('./assessment/assessmentRoutes'));


module.exports = router;