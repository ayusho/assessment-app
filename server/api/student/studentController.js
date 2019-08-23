var Student = require('./studentModel');
var Assessment = require('../assessment/assessmentModel');
var logger = require('../../util/logger');
var _ = require('lodash');
var Evaluator = require('../../util/evaluator');

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
            console.log(typeof assessment)
            if(assessment.length !== 0  ){
                student.assessments.push({title: assessmentTitle});
                Student.update({_id: student._id}, {"$push": {"assessments": { "title": assessmentTitle}  }}, function(err, updated){
                    if(err){
                        next(err);
                    }
                    else {
                        res.json(updated);
                    }
                })
            }
            else {
                next(new Error('No Assignment with this ID found in record'))
            }
                
        }, function(err){
            next(err);
        });
}

exports.unassignAssessment = function(req, res, next){
    var student = req.student;
    var assessmentTitle = req.body.title;
    _.merge(student, {
        assessment: [{
            name: assessmentTitle
        }]
    });

    Student.update({ '$pull': {assessments: {'$elemMatch': {title: assessmentTitle}}}}, function(err, updated){
        if(err){
            next(err);
        }
        else{
            res.json(updated);
        }
    })
}

exports.submitAssessment = function (req, res, next){
    var student = req.student;
    var assessment = req.body.assessment;
    var score = { spelling: '', grammar: '', relevance: ''};

    Promise.all([Evaluator.getSpellings(), Evaluator.getGrammar(), Evaluator.getRelevance()])
        .then(values => {
            _.merge(score, {spelling: values[0].score}, {grammar: values[1].score}, {relevance: values[2].score} )
            logger.log(student);
            Student.update(
                    {_id: student._id},
                    {"$set": {"assessments.$[assessment].score": score }},
                    { arrayFilters: [{'assessment.title': assessment.title}]}, function(err, updated){
                if(err){    
                    next(err);
                }
                else{
                    res.json(updated);
                }
            })
        })
        .catch(err => {
            next(err);
        })
}