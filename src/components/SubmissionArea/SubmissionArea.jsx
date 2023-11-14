import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from "../FileProcessor/Dropzone";
import PdfProcess from "../FileProcessor/PdfProcess";


function SubmissionArea() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileReceived = (files) => {
        const file = files[0];
        setSelectedFile(file);
    };

    return (
        <section className="submission-section">
            <div className="submission-container">
                <Dropzone onFilesChanged={handleFileReceived} />
                {selectedFile && <p>Uploaded File: {selectedFile.name}</p>}
                
            </div>
            <PdfProcess uploadedPDF={selectedFile} />
            <img src="./pics.png" className="draw-pic" alt="pics" />
        </section>
    );
}


// Prop typechecking
SubmissionArea.propTypes = {
    onOcrComplete: PropTypes.func  // You can retain this if you plan to use it in the future, but as of now, it's unused.
};

export default SubmissionArea;

