import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function Dropzone() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
      console.log(acceptedFiles);
      if (rejectedFiles.length) {
        console.warn("Some files were rejected:", rejectedFiles);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // Revoke the data uris to free up memory
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="drop-area">
          <DriveFolderUploadIcon />
        </div>
      )}
    </div>
  );
}

export default Dropzone;