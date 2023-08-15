import React from "react";
import pdf from "../../assets/img/pdf.pdf";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = (props) => {
  console.log(props.pdf);
  return (
    <Worker
      new
      workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
    >
      <div
        className="PdfViewer"
        style={{
          borderBottom: "1px solid #cccc",
          height: "750px",
        }}
      >
        <Viewer fileUrl={String(props.pdf)} />
      </div>
    </Worker>
  );
};

export default PdfViewer;
