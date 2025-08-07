import React, { useState } from "react";
import styles from "./StoreText.module.css";
import { storeTextAPI } from "../api/text.api.js";

const StoreText = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [uniqueCode, setUniqueCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCopied(false); // Reset copy status on new submission
    if (!content.trim()) {
      setMessage({ text: "Text content is required.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    setUniqueCode("");

    try {
      const res = await storeTextAPI(content);
      if (res.success) {
        setMessage({ text: "Success! Your text has been stored.", type: "success" });
        setUniqueCode(res.data.uniqueCode);
        setContent("");
      } else {
        setMessage({ text: res.message || "Failed to store text.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (uniqueCode) {
      try {
        await navigator.clipboard.writeText(uniqueCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Store Text</h2>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Text"}
        </button>
        {message.text && (
          <p className={`${styles.message} ${message.type === "success" ? styles.successMessage : styles.errorMessage}`}>
            {message.text}
            {uniqueCode && (
              <div className={styles.codeContainer}>
                <span className={styles.uniqueCode}>{uniqueCode}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={styles.copyButton}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </p>
        )}
      </form>
    </div>
  );
};

export default StoreText;