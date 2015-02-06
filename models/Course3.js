var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    id : Number,
    course : String,
    link : String,
    courseSearcH: String
});

module.exports = mongoose.model('Course', courseSchema);