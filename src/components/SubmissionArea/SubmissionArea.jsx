import React, { useState } from 'react';
import PropTypes from 'prop-types'; // This is for prop typechecking
import Dropzone from "../FileProcessor/Dropzone";

function SubmissionArea({ onOcrComplete }) { // Destructure onOcrComplete from props
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
            if(onOcrComplete) {
                onOcrComplete(data.result);  // Pass the result to the parent form
            }
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
            <img src="./pics.png" className="draw-pic" alt="pics" />
        </section>
    );
}

// Prop typechecking
SubmissionArea.propTypes = {
    onOcrComplete: PropTypes.func
};

export default SubmissionArea;
