import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../api/user.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
const Login = () => {
  const {setUser} = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setLoading(true)
    const response = await loginUser(email,password);
    console.log(response)
    console.log("login response == ", response)
    if(response?.success){
      setUser(response.data)
      navigate("/dashboard")
     // window.location.reload();
      setLoading(false)
    }else{
      setError(response.message)
      setLoading(false)
    }
    // You can call your login API or do validation here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-link">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">{loading ? "Logging..." : "Login"}</button>
           {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="signup-text">
  New here? <Link to="/register">Create account</Link>
</p>
      </div>
    </div>
  );
};

export default Login;
