const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
projectName: {
    type: String,
    required: true
},
leadTime: {
    stringValue: {
        type: String,
        required: true
    },
    numberValue: {
        type: Number,
        required: true
    }
}, 
duration: {
    type: Number, 
    required: true
},
tradeList: {
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
}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;