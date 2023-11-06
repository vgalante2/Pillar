import React, { useState, useEffect } from 'react';

function PdfProcess({ uploadedPDF, onProcessComplete }) {
    const [convertedImages, setConvertedImages] = useState([]);
    const [ocrResults, setOcrResults] = useState([]);

    useEffect(() => {
        const handlePDFUpload = async () => {
            if (uploadedPDF && uploadedPDF.type === "application/pdf") {
                const formData = new FormData();
                formData.append('pdfFile', uploadedPDF);

                try {
                    const response = await fetch('/api/convert-pdf-to-image', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();

                    if (data.images) {
                        setConvertedImages(data.images);
                    }
                    if (data.ocrResults) {
                        setOcrResults(data.ocrResults);
                        if (onProcessComplete) {
                            onProcessComplete(data.ocrResults); // Pass the OCR results to the parent component
                        }
                    }
                } catch (error) {
                    console.error("Error during conversion:", error);
                }
            }
        };

        handlePDFUpload();
    }, [uploadedPDF, onProcessComplete]);

    return (
        <div className="pdf-process-container">
            {/* Render the converted images */}
            <div className="converted-images">
                {convertedImages.map((image, index) => (
                    <img key={index} src={`data:image/png;base64,${image}`} alt={`Converted page ${index + 1}`} />
                ))}
            </div>
            {/* Render OCR results if needed */}
            <div className="ocr-results">
                {ocrResults.map((result, index) => (
                    <div key={index}>
                        <p>OCR Result for page {index + 1}:</p>
                        <textarea value={result} readOnly />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PdfProcess;


