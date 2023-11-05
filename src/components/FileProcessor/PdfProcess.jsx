import React, { useState, useEffect } from 'react';

function PdfProcess({ uploadedPDF, onProcessComplete }) {
    const [convertedImages, setConvertedImages] = useState([]);

    const handlePDFUpload = async (file) => {
        if (file && file.type === "application/pdf") {
            // Convert PDF to Image
            const formData = new FormData();
            formData.append('pdfFile', file);
            try {
                const response = await fetch('/convert-pdf-to-image', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                
                // Check if data.images is an array
                if (Array.isArray(data.images)) {
                    setConvertedImages(data.images);
                    
                    // Process the converted images with OCR
                    processImagesWithOCR();
                } else {
                    console.error("Received data is not an array:", data.images);
                }

            } catch (error) {
                console.error("Error during conversion:", error);
            }
        }
    };

    const processImagesWithOCR = async () => {
        try {
            for (const image of convertedImages) {
                const formData = new FormData();
                formData.append('uploadfile', image);
                const response = await fetch('/api/ocr', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.result) {
                    console.log("OCR Successful:", data.result);
                    if(onProcessComplete) {
                        onProcessComplete(data.result);  // Pass the OCR text to the parent
                    }
                } else {
                    console.log("OCR didn't return any text.");
                }
            }
        } catch (error) {
            console.log("Error processing images: ", error);
        }
    };

    useEffect(() => {
        if (uploadedPDF) {
            handlePDFUpload(uploadedPDF);
        }
    }, [uploadedPDF]);

    return (
        <div className="pdf-process-container">
            {/* ... other components and elements ... */}
            <div className="converted-images">
                {convertedImages && convertedImages.map((image, index) => (
                    <img key={index} src={`data:image/png;base64,${image}`} alt={`Converted page ${index + 1}`} />
                ))}
            </div>
        </div>
    );
}

export default PdfProcess;

