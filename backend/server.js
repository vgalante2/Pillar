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


mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});