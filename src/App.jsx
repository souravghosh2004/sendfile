import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './page/About';
import Home from './page/Home';
import Layout from './laouts/Layout';
import Login from './page/Login'
import UploadFile from './main_page/UpoladFile';
import AccessFiles from './main_page/AccessFiles';

function App() {
  return (
    <div className="maindiv">
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-file" element={<UploadFile />} />
        <Route path="/access-files" element={<AccessFiles/>} />
      </Routes>
    </Layout>
    </div>
    
  );
}

export default App;
