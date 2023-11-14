const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { pdf } = require('pdf-to-img');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// This endpoint will handle both PDF to image conversion and OCR
router.post('/api/convert-pdf-to-image', upload.single('pdfFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Convert the uploaded PDF buffer to images
        const doc = await pdf(req.file.buffer);
        const images = [];
        const ocrResults = [];

        for await (const page of doc) {
            const imageBase64 = page.toString('base64');
            images.push(imageBase64); // Collect image data
            
            // Perform OCR on the converted image
            const ocrResult = await Tesseract.recognize(Buffer.from(imageBase64, 'base64'));
            ocrResults.push(ocrResult.data.text); // Collect OCR result
        }

        // Respond with the images and OCR results
        res.json({ images, ocrResults });

    } catch (error) {
        console.error('Error during PDF processing:', error);
        res.status(500).send('Error processing PDF file');
    }
});

module.exports = router;
