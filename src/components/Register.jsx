import React, { useState, useEffect } from "react";
import "./styles/Register.css";
import OtpInput from "./OtpInput";
import { tempUserCreate, createNewUser } from "../api/user.api.js";
function Register() {
  const [step, setStep] = useState(2); // 1 = register, 2 = otp
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

   useEffect(() => {
    const saved = sessionStorage.getItem("signupData");
    if (!saved) {
      setStep(1)
    } else {
      setForm(JSON.parse(saved));
    }
  },[]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        setLoading(true)
      const response = await tempUserCreate(form.email, form.password, form.fullName);
      if(response.success){
        sessionStorage.setItem("signupData", JSON.stringify(form));
        setStep(2);
      }else{
        setError(response.message)
      }
       // Move to OTP step
    } catch (err) {
      setError("Registration failed. Try again.");
    }finally{
        setLoading(false)
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }
   
    setLoading(true)
    try {
 
    const saved = sessionStorage.getItem("signupData");
    if (!saved) {
      setStep(1)
    } else {
      setForm(JSON.parse(saved));
    }
  
        
        const response = await createNewUser(form.email, otp)
        if(response.success){
            sessionStorage.removeItem("signupData")
            window.location.href = "/";   
        }else{
            setError(response.message)
        }
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="register-container">
      {step === 1 && (
        <form className="register-form" onSubmit={handleRegister}>
          <h2>User Registration</h2>
          {error && <p className="error">{error}</p>}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">{loading ? "Registering...." : "Register"}</button>
        </form>
      )}

      {step === 2 && (
  <form className="register-form" onSubmit={handleVerifyOtp}>
    {error && <p className="error">{error}</p>}
    <h2>Enter OTP</h2>

    <p className="info">
  OTP has been sent to your email <strong>{form.email}</strong>. If you don’t see it,
  please check the <strong>Spam</strong>/<strong>Junk</strong> folder.
</p>


    <OtpInput otp={otp} setOtp={setOtp} length={6} />

    <button type="submit">{loading ? "Verifying...." : "Verify OTP"}</button>
  </form>
)}
    </div>
  );
}

export default Register;
