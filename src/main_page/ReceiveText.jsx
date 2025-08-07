import React, { useState } from "react";
import styles from "./ReceiveText.module.css";
import { receiveTextAPI } from "../api/text.api";
import { jsPDF } from "jspdf";

const ReceiveText = () => {
  const [code, setCode] = useState("");
  const [textData, setTextData] = useState(null);
  const [format, setFormat] = useState("txt");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setError("");
    setTextData(null);
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-character code.");
      return;
    }

    try {
      const res = await receiveTextAPI(code);
      if (!res.success) {
        setError(res.message || "Invalid code.");
      } else {
        setTextData(res.data.content);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const handleCopy = async () => {
    if (!textData) return;
    await navigator.clipboard.writeText(textData);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!textData) return;

    const triggerDownload = (blob, filename) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    };

    let blob;
    let filename;

    switch (format) {
      case "pdf":
        const doc = new jsPDF();
        doc.text(textData, 10, 10);
        doc.save(`text.${format}`);
        return;
      case "csv":
        blob = new Blob([textData], { type: "text/csv;charset=utf-8;" });
        filename = `text.csv`;
        break;
      default:
        blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
        filename = `text.${format}`;
        break;
    }

    triggerDownload(blob, filename);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Receive Shared Text</h2>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          // ADDED: This new event handler checks for the "Enter" key press
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFetch();
            }
          }}
          className={styles.input}
        />
        <button onClick={handleFetch} className={styles.fetchBtn}>
          Fetch Text
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {textData && (
        <div className={styles.resultBox}>
          <textarea className={styles.textArea} readOnly value={textData} />
          <div className={styles.actions}>
            <button onClick={handleCopy} className={styles.copyBtn}>
              {copied ? "Copied!" : "Copy"}
            </button>

            <select
              className={styles.dropdown}
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="txt">.txt</option>
              <option value="csv">.csv</option>
              <option value="pdf">.pdf</option>
              <option value="java">.java</option>
              <option value="py">.py</option>
              <option value="js">.js</option>
              <option value="html">.html</option>
              <option value="cpp">.cpp</option>
            </select>

            <button onClick={handleDownload} className={styles.downloadBtn}>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveText;