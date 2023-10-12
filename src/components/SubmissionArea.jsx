import React, { useState } from 'react';
import Dropzone from "./Dropzone";

function SubmissionArea() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [ocrText, setOcrText] = useState('');

    const fileList = selectedFiles.map(file => <li key={file.name}>{file.name}</li>);

    const processImagesWithOCR = async () => {
      const formData = new FormData();
      formData.append('uploadfile', uploadedImage);
  
      try {
          const response = await fetch('/api/ocr', {
              method: 'POST',
              body: formData
          });
  
          const data = await response.json();
  
          if (data.result) {
              console.log("OCR Successful:", data.result);
              setOcrText(data.result);
          } else {
              console.log("OCR didn't return any text.");
          }
      } catch (error) {
          console.log("Error processing images: ", error);
      }
  };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
            processImagesWithOCR(); // Automatically start the OCR process
        }
    };

    return (
        <section className="submission-section">
            <div className="submission-container">
                <Dropzone onFilesChanged={setSelectedFiles} onChange={handleImageUpload} />
                <ul>
                    {fileList}
                </ul>
            </div>
            <div>{ocrText}</div>
        </section>
    );
}

export default SubmissionArea;