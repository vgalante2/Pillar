import React, { useEffect } from 'react';
const { pdf } = require("pdf-to-img");

function PdfToImageComponent() {
  useEffect(() => {
    async function convertPdfToImg() {
      const doc = await pdf("example.pdf");
      for await (const page of doc) {
        // Process each page, e.g., append to DOM, send to server, etc.
        console.log(page);  // Logs image data for each page
      }
    }
    convertPdfToImg();
  }, []);

  return (
    <div>
      Check console for PDF to image conversion output.
    </div>
  );
}

export default PdfToImageComponent;
