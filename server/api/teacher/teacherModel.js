var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = new Schema({
    name: String,
    employeeCode: {
        type: Number,
        unique: true,
    }
});

module.exports = mongoose.model('teacher', TeacherSchema)