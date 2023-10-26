const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const dbURI = process.env.MONGO_URI;

const app = express();
// const data = "./project.json";


app.use(cors());
app.use(bodyParser.json());

const path = require('path'); // Add this to the top of your file
// ...

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, '../ocr_project/build')));




mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));


const Project = mongoose.model('Project', new mongoose.Schema({
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
}));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ocr_project/build', 'index.html'));
});





app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});