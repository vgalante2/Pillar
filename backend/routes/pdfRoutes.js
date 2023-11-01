const express = require('express');
const multer = require('multer');
const { pdf } = require('pdf-to-img');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/convert-pdf-to-image', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const doc = await pdf(req.file.buffer); // Convert the uploaded PDF buffer
        const images = [];
        for await (const page of doc) {
            images.push(page.toString('base64')); // Convert image data to base64 string for easy transmission
        }

        // Return the base64 encoded images to the frontend
        res.json({ images: images });

    } catch (error) {
        console.error('Error converting PDF to image:', error);
        res.status(500).send('Error processing file');
    }
});

module.exports = router;
