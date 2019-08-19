var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssessmentSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    assessment: {
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model('assessment', AssessmentSchema)