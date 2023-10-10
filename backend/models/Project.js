const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
projectName: {
    type: String,
    required: true
},
leadTime: {
    type: Number, 
    required: true
}, 
duration: {
    type: Number, 
    required: true
},
jobs: {
    title: String, 
    description: String
},
workAddress: {
    street: String,
    city: String, 
    state: String,
    zip: String
},
sketches: {
    type: String, 
    required: true
},
tradesNeeded: [String]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;