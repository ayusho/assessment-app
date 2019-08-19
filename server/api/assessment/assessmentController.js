var Assessment = require('./assessmentModel');
var logger = require('../../util/logger');
var _ = require('lodash');

exports.params = function(req, res, next, id){
    Assessment.findById(id)
        .then(function(assessment){
            if(!assessment){
                next(new Error('No assessment found with that id'))
            }
            else {
                req.assessment = assessment;
                next();
            }
        }, function(err){
            next(err);
        });
};

exports.get = function (req, res, next){
    Assessment.find({})
        .then(function(assessment){
            res.json(assessment);
        },function(err){
            next(err);
        });
};

exports.post = function (req, res, next){
    var newAssessment = {};
    newAssessment.title = req.body.title;
    newAssessment.assessment = req.files.assessment.data;
    
    Assessment.create(newAssessment)
        .then(function(assessment){
            res.json(assessment);
        }, function(err){
            logger.log(err);
            next(err);
        })
        .catch(function(err){
            logger.log(err);
        });
};

exports.put = function(req, res, next){
    var assessment = req.assessment;

    var update = req.body;
    _.merge(assessment, update);
    assessment.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    })
}

exports.delete = function(req, res, next){
    req.assessment.remove(function(err, removed){
        if(err){
            next(err);
        }
        else {
            res.json(removed);
        }
    });
}
