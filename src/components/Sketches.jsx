import React, { useState } from 'react';

function Sketches() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  

const handleImageUpload = (event) => {
const file = event.target.files[0];
if (file) {
    setUploadedImage(file);
}
};

const processImagesWithOCR = async () => {
    const formData = new FormData();
    formData.append('uploadfile', uploadedImage);

    try {
        const response = await fetch('/api/ocr', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        setOcrText(data.result);
    } catch (error) {
        console.log("Error processing images: ", error);
    }
};

    return (
        <div>
            <input className="sketch-btn" type="file" onChange={handleImageUpload} />
            {uploadedImage && <button onClick={processImagesWithOCR}>Process with OCR</button>}
            <div>{ocrText}</div>
        </div>
    );
}

export default Sketches;