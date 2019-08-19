var Teacher = require('../api/teacher/teacherModel');
var Student = require('../api/student/studentModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding Database');

var teachers = [
    {  name: 'Neha Sharma', employeeCode: '12345'  },
];

var students = [
    { name: 'Ayush Ojha', rollNumber: '675632' },
    { name: 'Palak Sharma', rollNumber: '675633' }
];

var createDoc = function(model, doc){
    return new Promise(function(resolve, reject){
        new model(doc).save(function(err, saved){
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = function (){
    logger.log('...cleaning the DB');
    var cleanPromises = [Teacher, Student]
        .map(function(model){
            return model.deleteOne().exec();
        });
    return Promise.all(cleanPromises);
};

var createTeachers = function(data){
    var promises = teachers.map(function(teacher){
        return createDoc(Teacher, teacher)
    });

    return Promise.all(promises)
        .then(function(teachers){
            return _.merge({teachers: teachers}, data || {});
        })
};

var createStudents = function(data){
    var promises = students.map(function(student){
        return createDoc(Student, student)
    });

    return Promise.all(promises)
        .then(function(students){
            return _.merge({students: students}, data || {});
        })
};

cleanDB()
    .then(createTeachers)
    .then(createStudents)
    .then(logger.log('...Data Seeded!!!'));