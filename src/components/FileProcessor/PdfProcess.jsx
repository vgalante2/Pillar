import React, { useState } from 'react';
import Dropzone from "./Dropzone";
import axios from 'axios';

function PdfProcess({ onProcessComplete }) {
    const [uploadedPDF, setUploadedPDF] = useState(null);
    const [ocrResult, setOcrResult] = useState('');
    const [processing, setProcessing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedImages, setConvertedImages] = useState([]);
    const [error, setError] = useState('');
   

    const handlePDFUpload = async (event) => {  // Note the 'async' keyword added here
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setUploadedPDF(file);
            setProcessing(true);
            setError('');  // Clear previous error if any
            
            // Convert PDF to Image
            const formData = new FormData();
            formData.append('pdfFile', file);
            try {
                const response = await axios.post('/convert-pdf-to-image', formData);
                const images = response.data.images;
                setConvertedImages(images);
    
                // Further processing if needed (e.g., OCR)
                processPDFWithOCR(file);
            } catch (error) {
                setError("Error converting PDF to image.");
                console.error("Error during conversion:", error);
            }
        } else {
            setError('Please upload a valid PDF file.');
        }
    };

    const processPDFWithOCR = async (file) => {
        const formData = new FormData();
        formData.append('pdfFile', file);
        try {
            const response = await fetch('/api/pdf-to-ocr', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.result) {
                setOcrResult(data.result);
                onProcessComplete(data.result);
            } else {
                setError("OCR didn't return any text.");
            }
        } catch (error) {
            setError("Error processing PDF. Please try again.");
            console.error("Error processing PDF: ", error);
        } finally {
            setProcessing(false);
        }
    };

    const clearUploadedFile = () => {
        setUploadedPDF(null);
        setOcrResult('');
        setError('');
    };

    return (
        <div className="pdf-process-container">
            {/* ... other components and elements ... */}
            <div className="converted-images">
                {convertedImages.map((image, index) => (
                    <img key={index} src={`data:image/png;base64,${image}`} alt={`Converted page ${index + 1}`} />
                ))}
            </div>
        </div>
    );
    
}

export default PdfProcess;