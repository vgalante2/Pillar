import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

function Dropzone({ onFilesChanged, accept }) {

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Notify parent component about the accepted files
    if (acceptedFiles?.length && onFilesChanged) {
      onFilesChanged(acceptedFiles);
    }

    if (rejectedFiles.length) {
      console.warn("Some files were rejected:", rejectedFiles);
    }
  }, [onFilesChanged]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept  // Pass the accept prop to useDropzone
  });

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