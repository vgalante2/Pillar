const express = require('express');
const fileUpload = require('express-fileupload');
const pdfRoutes = require('./pdfRoutes'); 
const { pdf } = require("pdf-to-img");
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const dbURI = process.env.MONGO_URI;

const app = express();

// Use cors middleware
app.use(cors());

// Use bodyParser middleware
app.use(bodyParser.json());

// Use express-fileupload middleware
app.use(fileUpload());

app.use('/api',pdfRoutes);





// OCR endpoint
app.post('/api/ocr', async (req, res) => {
    try {
        let file = req.files.uploadfile;
        let result = await Tesseract.recognize(file.data);
        res.json({ result: result.data.text });
    } catch (error) {
        res.status(500).send("Error in OCR processing.");
    }
});




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