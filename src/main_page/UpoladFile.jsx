import React, { useState, useCallback, useEffect } from 'react';
import './UploadFile.css';
import { uploadFiles } from '../api/user.api.js';

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [uniqueCode, setUniqueCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const limitExceeded = totalSize > 50 * 1024 * 1024;

  const addFiles = useCallback((newFileList) => {
    const newFilesArray = Array.from(newFileList).map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    setSelectedFiles(prevFiles => {
      const allFiles = [...prevFiles, ...newFilesArray];
      const uniqueFilesMap = new Map();
      const uniqueFiles = [];

      allFiles.forEach(item => {
        const key = item.file.name + '-' + item.file.size;
        if (!uniqueFilesMap.has(key)) {
          uniqueFilesMap.set(key, true);
          uniqueFiles.push(item);
        }
      });

      const newTotalSize = uniqueFiles.reduce((sum, item) => sum + item.file.size, 0);
      if (newTotalSize > 50 * 1024 * 1024) {
        alert("Total selected files size exceeds 50 MB. Please remove some files.");
        return prevFiles;
      }

      setTotalSize(newTotalSize);
      return uniqueFiles;
    });
  }, []);

  // Allow drag-drop anywhere on page
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [addFiles]);

  const handleFileChange = (e) => addFiles(e.target.files);

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      const newTotal = updated.reduce((sum, item) => sum + item.file.size, 0);
      setTotalSize(newTotal);
      return updated;
    });
  };

  const handleCopyCode = () => {
    if (uniqueCode) {
      navigator.clipboard.writeText(uniqueCode)
        .then(() => setCopied(true))
        .catch(err => console.error('Copy failed:', err));
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setMessage(null);
    setUniqueCode(null);

    let realDone = false;
    let fakeProgress = 0;
    let fakeInterval = null;

    const startFakeProgress = () => {
      fakeInterval = setInterval(() => {
        if (fakeProgress < 95) {
          fakeProgress += Math.random() * 2;
          setUploadProgress(Math.floor(fakeProgress));
        }
      }, 200);
    };

    try {
      const response = await uploadFiles(
        selectedFiles.map(item => item.file),
        percent => {
          setUploadProgress(percent);
          if (percent >= 100 && !realDone) {
            realDone = true;
            startFakeProgress();
          }
        }
      );

      clearInterval(fakeInterval);
      setUploadProgress(100);
      setMessage({ type: 'success', text: response.message || 'File uploaded successfully!' });
      if (response.data?.uniqueCode) {
        setUniqueCode(response.data.uniqueCode);
      }
      setSelectedFiles([]);
      setTotalSize(0);
    } catch (error) {
      clearInterval(fakeInterval);
      console.error('Upload failed:', error);
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 800);
    }
  };

  return (
    <div className="upload">
      <div className="upload-page-container">
        <h2 className="upload-title">Upload Your Files</h2>
        <p className="upload-description">
          Select or drag and drop files anywhere on this page. After upload, you'll get a unique code to share with anyone!
        </p>

        <form className="upload-form">
          {selectedFiles.length > 0 && (
            <ul className="selected-file-list">
              {selectedFiles.map((item, idx) => (
                <li key={idx} className="selected-file-item">
                  {item.preview ? (
                    <img src={item.preview} alt={item.file.name} className="file-thumbnail" />
                  ) : (
                    <span className="file-icon">📄</span>
                  )}
                  <span className="file-name">{item.file.name}</span>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveFile(idx)}
                    disabled={uploading}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}

          <label htmlFor="filesInput" className="file-input-label">
            📁 Choose file(s):
          </label>
          <p className={`size-info ${limitExceeded ? 'limit-exceeded' : ''}`}>
            Used: {(totalSize / (1024 * 1024)).toFixed(1)} MB / 50 MB
          </p>
          <input
            type="file"
            id="filesInput"
            name="filesInput"
            multiple
            className="file-input"
            onChange={handleFileChange}
            disabled={uploading}
          />

          <button
            type="button"
            className="upload-button"
            onClick={handleSubmit}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Files'}
          </button>

          {message && (
            <p className={`upload-message ${message.type}`}>
              {message.text}
            </p>
          )}

          {uniqueCode && (
            <div className="unique-code-box">
              <span className="code">Your Code: <b>{uniqueCode}</b></span>
              <button type="button" onClick={handleCopyCode} className="copy-btn">
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
          )}
        </form>

        <p className="warning-text">
          ⚠️ Save your code securely — without it, files cannot be downloaded later.
        </p>
      </div>
    </div>
  );
};

export default UploadFile;
