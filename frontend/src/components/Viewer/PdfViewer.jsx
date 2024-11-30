import React from "react";
import pdf from "../../assets/img/pdf.pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { FULL_PATH } from "../../config";

// import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ file }) => {
  console.log(file);
  return (
    <div
      className="PdfViewer"
      style={{
        borderBottom: "1px solid #cccc",
        height: "750px",
      }}
    >
      <iframe
        src={`${FULL_PATH}/documents/${file}`}
        style={{
          // borderBottom: "1px solid #cccc",
          border: "none",
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default PdfViewer;
