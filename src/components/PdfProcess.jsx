import React, { useState } from 'react';
import Dropzone from "./Dropzone";

function PdfProcess({ onProcessComplete }) {
    const [uploadedPDF, setUploadedPDF] = useState(null);
    const [ocrResult, setOcrResult] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handlePDFUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setUploadedPDF(file);
            setProcessing(true);
            setError('');  // Clear previous error if any
            processPDFWithOCR(file);
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
            <Dropzone onChange={handlePDFUpload} accept="application/pdf" />
            {processing && <p>Processing...</p>}
            {error && <p className="error-message">{error}</p>}
            {uploadedPDF && !processing && (
                <button onClick={clearUploadedFile}>Clear Uploaded PDF</button>
            )}
            <div className="ocr-result">{ocrResult}</div>
        </div>
    );
}

export default PdfProcess;