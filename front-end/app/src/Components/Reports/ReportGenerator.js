import { useEffect, useRef, useState } from "react";
import html2PDF from "jspdf-html2canvas";
import "./ReportGenerator.css";
import SponsorNav from "../UI/SponsorNav";

const STATUS_PREVIEW = "preview";
const STATUS_GENERATING = "generating";
const STATUS_ERROR = "error";
const STATUS_READY = "ready";

const ReportGenerator = ({
  title = "Report",
  filename = "report.pdf",
  children,
}) => {
  const source = useRef();
  const [downloadURL, setDownloadURL] = useState(null);
  const [status, setStatus] = useState(STATUS_PREVIEW);

  useEffect(() => setStatus(STATUS_PREVIEW), [children]);

  const generate = async () => {
    setStatus(STATUS_GENERATING);

    try {
      const pdf = await html2PDF(source.current, {
        jsPDF: { unit: "in", format: "letter" },
        margin: { top: 1, right: 1, bottom: 1, left: 1 },
        html2canvas: { imageTimeout: 15000, logging: true, useCORS: false },
        imageType: "image/png",
        imageQuality: 1,

        // Override default handlers with empty ones.
        init: () => {},
        success: () => {},
      });

      setDownloadURL(pdf.output("bloburl"));
      setStatus(STATUS_READY);
    } catch (err) {
      setStatus(STATUS_ERROR);
      throw err;
    }
  };

  return (
    <div className="ReportPage">
      <SponsorNav />
      <div className="Spacer"></div>
      <div className="InfoBox">
        <h1>{title}</h1>

        <div className="ButtonBlock">
          <button onClick={generate} disabled={status !== STATUS_PREVIEW}>
            Generate
          </button>
          <a
            href={downloadURL}
            download={filename}
            disabled={status !== STATUS_READY}
          >
            Download
          </a>
        </div>

        <div className="StatusBlock">
          {
            {
              [STATUS_PREVIEW]: "Review the report preview before generating.",
              [STATUS_GENERATING]: "Generating report PDF, please wait.",
              [STATUS_ERROR]:
                "There was an problem when generating your report.",
              [STATUS_READY]: "Success! Your report download is ready.",
            }[status]
          }
        </div>
      </div>
      <h2>Preview</h2>
      <div className="DocumentBox">
        <div className="Document">
          <div ref={source}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
