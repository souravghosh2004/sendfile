import React from "react";
import "./styles/Register.css";

function OtpInput({ otp, setOtp, length }) {
  const handleChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits
    let otpArray = otp.split("");

    otpArray[index] = value;
    setOtp(otpArray.join(""));

    // Auto focus next box
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
    if (e.key === "ArrowLeft" && e.target.previousSibling) {
      e.preventDefault();
      e.target.previousSibling.focus();
    }
    if (e.key === "ArrowRight" && e.target.nextSibling) {
      e.preventDefault();
      e.target.nextSibling.focus();
    }
  };

  const handleFocus = (e) => {
    // Always keep cursor at the right side
    e.target.setSelectionRange(1, 1);
  };

  return (
    <div className="otp-box">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={otp[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={handleFocus}
        />
      ))}
    </div>
  );
}

export default OtpInput;
