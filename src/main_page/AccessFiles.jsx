import React, { useState } from "react";
import { getFilesByCode } from "../api/user.api.js";
import "./AccessFiles.css";

const AccessFiles = () => {
  const [code, setCode] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleFetchFiles = async () => {
    const trimmedCode = code.trim();
    if (!/^[0-9]{6}$/.test(trimmedCode)) {
      setErrorMessage("Please enter a valid 6-digit numerical code.");
      setInfoMessage("");
      setFiles([]);
      return;
    }

    setErrorMessage("");
    setInfoMessage("");
    setLoading(true);
    setFiles([]);

    try {
      const result = await getFilesByCode(trimmedCode);

      if (result.success && Array.isArray(result.data)) {
        setFiles(result.data);
        if (result.data.length > 0) {
          setInfoMessage(`Found ${result.data.length} file(s).`);
        } else {
          setInfoMessage("No files found for the entered code.");
        }
      } else {
        setErrorMessage(result.message || "Failed to fetch files.");
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (url) => {
    if (!url) {
      setErrorMessage("Print failed: URL missing.");
      return;
    }
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        try {
          printWindow.print();
        } catch (e) {
          console.error("Printing failed:", e);
          setErrorMessage("Print failed. Try downloading or check your browser's popup settings.");
          if (!printWindow.closed) {
            printWindow.close();
          }
        }
      };
    } else {
      setErrorMessage("Popup blocked. Please enable popups for this site.");
    }
  };

  const handleDownload = async (url, fileName, idx) => {
    if (!url) {
      setErrorMessage("Download URL missing.");
      return;
    }
    
    setDownloading(idx);
    setErrorMessage("");

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to download");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "file";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      setErrorMessage(`Download failed for ${fileName}.`);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="access-page-container">
      <div className="access-content-wrapper">
        <h1 className="page-title">Access Your Files</h1>
        <p className="page-subtitle">Enter your 6-digit code to retrieve and manage your documents.</p>

        <div className="input-section">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            onKeyDown={(e) => e.key === 'Enter' && handleFetchFiles()}
          />
          <button onClick={handleFetchFiles} disabled={loading}>
            {loading ? "Fetching..." : "Fetch Files"}
          </button>
        </div>

        {errorMessage && <div className="message error-message">{errorMessage}</div>}
        {infoMessage && <div className="message info-message">{infoMessage}</div>}

        <div className="file-grid">
          {files.map((file, idx) => {
            const previewUrl = file.previewUrl;
            const downloadUrl = file.downloadUrl;
            const fileName = file.fileName || `File ${idx + 1}`;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            const isDownloading = downloading === idx;

            const isPrintable = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'txt', 'csv', 'md', 'java', 'py', 'js', 'html', 'css', 'json', 'docx'].includes(fileExtension);
            
            const renderPreview = () => {
              switch (fileExtension) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                case 'webp':
                  return <img src={previewUrl} alt={fileName} className="file-preview-image" />;
                case 'mp4':
                case 'webm':
                case 'ogg':
                  return <video src={previewUrl} controls className="file-preview-video" />;
                case 'mp3':
                   return (
    <div className="audio-wrapper">
      <audio src={previewUrl} controls className="file-preview-audio" />
    </div>
  );;
                case 'pdf':
                case 'txt':
                case 'csv':
                case 'md':
                case 'java':
                case 'py':
                case 'js':
                case 'html':
                case 'css':
                case 'json':
                case 'docx':
                  return <iframe src={previewUrl} title={fileName} className="file-preview-frame" />;
                default:
                  return <div className="file-icon">📄</div>;
              }
            };

            return (
              <div key={idx} className="file-card">
                <div className="file-card-header">
                  <div className="file-type-icon">{fileExtension.toUpperCase()}</div>
                  <p className="file-name" title={fileName}>{fileName}</p>
                </div>
                <div className="file-preview-area">
                  {renderPreview()}
                </div>
                <div className="file-card-actions">
                  <button 
                    className="action-button primary-btn" 
                    onClick={() => handleDownload(downloadUrl, fileName, idx)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download"}
                  </button>
                  
                  {isPrintable && (
                    <button 
                      className="action-button secondary-btn" 
                      onClick={() => handlePrint(previewUrl)}
                      disabled={isDownloading}
                    >
                      Print
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccessFiles;