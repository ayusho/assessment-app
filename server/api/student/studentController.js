var Student = require('./studentModel');
var Assessment = require('../assessment/assessmentModel');
var logger = require('../../util/logger');
var _ = require('lodash');

exports.params = function (req, res, next, id) {
    Student.findById(id)
        // .populate('assessment', '')
        .then(function (student) {
            if (!student) {
                next(new Error('No student found with that ID'));
            } else {

                req.student = student;
                next();
            }
        }, function (err) {
            next(err);
        });
}

exports.get = function (req, res, next) {
    Student.find({})
        .then(function (students) {
            res.json(students);
        }, function (err) {
            next(err);
        });
};

exports.getOne = function (req, res, next) {
    var student = req.student;
    res.json(student);
}

exports.post = function (req, res, next) {
    var newStudent = req.body;

    Student.create(newStudent)
        .then(function (student) {
            res.json(student);
        }, function (err) {
            logger.log(err);
            next(err);
        });
};

exports.put = function (req, res, next) {
    var student = req.student;

    var update = req.body;

    _.merge(student, update);

    student.save(function (err, saved) {
        if (err) {
            next(err)
        } else {
            res.json(saved);
        }
    })
};

exports.delete = function (req, res, next) {
    req.student.remove(function (err, removed) {
        if (err) {
            next(err)
        } else {
            res.json(removed);
        }
    })
}

exports.assignAssessment = function (req, res, next) {
    var student = req.student;
    var assessmentTitle = req.body.title;
    console.log(req.body, assessmentTitle);
    Assessment.find({
            title: assessmentTitle
        })
        .then(function (assessment) {
            logger.log('assessment' + assessment);
            if(typeof assessment === 'Object'){
                _.merge(student, {
                    assessment: [{
                        name: assessmentTitle
                    }]
                })
                student.save(function (err, saved) {
                    if (err) {
                        next(err)
                    } else {
                        res.json(saved);
                    }
                })
            }
                
        }, function(err){
            next(err);
        });
}

exports.submitAssessment = function (req, res, next){

}