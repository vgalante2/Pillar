import React, { useState } from 'react';
import Dropzone from "./Dropzone";

function SubmissionArea() {
const [selectedFiles, setSelectedFiles] = useState([]);


const fileList = selectedFiles.map(file => <li key={file.name}>{file.name}</li>);

  return (
    <section className="submission-section">
    <div className="submission-container">
    <Dropzone  onFilesChanged={setSelectedFiles}/>
   <ul>
    {fileList}
   </ul>
    </div>
    </section>
  );
}

export default SubmissionArea;