import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useAuth } from "../context/AuthProvider";
import { getAllUniqueCodesDetails } from "../api/uniqueCode.api.js";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const username = user?.fullName || "User";
  const [filesData, setFilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert(`Copied: ${code}`);
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Failed to copy code. Please try again.");
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm(`Are you sure you want to delete code: ${code}?`)) {
      return;
    }
    try {
      // TODO: Call API to delete by uniqueCode
      alert(`Deleted ${code} successfully.`);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) {
      return;
    }
    try {
      logout();
      // Optional: Redirect
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong during logout.");
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const response = await getAllUniqueCodesDetails();
        if (response.success) {
          setFilesData(response.data);
        } else {
          setError(response.message || "Failed to fetch data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Internal error. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.container} style={{ color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.greeting}>Hi, {username} 👋</h2>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.filesWrapper}>
        {filesData.map((item, index) => (
          <div key={index} className={styles.fileBox}>
            <div className={styles.codeRow}>
              <span className={styles.uniqueCode}>{item.uniqueCode}</span>
              <button
                className={styles.copyBtn}
                onClick={() => handleCopy(item.uniqueCode)}
              >
                Copy
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.uniqueCode)}
              >
                Delete
              </button>
            </div>

            <div className={styles.fileList}>
              {item.urls.map((file, i) => (
                <div key={i} className={styles.fileName}>
                  {file.fileName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
