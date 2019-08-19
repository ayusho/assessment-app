var Teacher = require('./teacherModel');
var _ = require('lodash');

exports.get = function (req, res, next){
    Teacher.find({})
        .then(function(teachers){
            res.json(teachers);
        },function(err){
            next(err);
        });
};

