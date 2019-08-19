var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        unique: true
    },
    assessment: [{
        title: {
            type: String,
            ref: 'assessment' 
        },
        score: {
            spelling: Number,
            grammar: Number,
            relevance: Number
        }
    }]
});

module.exports = mongoose.model('student', StudentSchema)