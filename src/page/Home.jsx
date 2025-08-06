
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import AccessFiles from '../main_page/AccessFiles';
const Home = () => {
  const navigate = useNavigate();
    const navigateUploadFile = () => {
      navigate("/upload-file")
    }

    const navigateAccessFiles = () => {
      navigate("/access-files")
    }

  return (
    <div className="home-container">
       
      <section className="how-to-use">
        <h2>📌 How to Use</h2>
        <ol>
          <li>Upload your file or text and get a unique <strong>6-digit code</strong>.</li>
          <li>Share the code with anyone.</li>
          <li>They can use it to <strong>download the file</strong> or <strong>view the text</strong>.</li>
        </ol>
      </section>

      <section className="file-share-section">
        <h2>📁 Share File</h2>
        <div className="buttons">
          <button className="primary-btn" onClick={navigateUploadFile}>Upload File</button>
          <button className="secondary-btn" onClick={navigateAccessFiles}>Download File</button>
        </div>
      </section>

      <section className="text-share-section">
        <h2>📝 Share Text</h2>
        <div className="buttons">
          <button className="text-btn">Share Text</button>
          <button className="show-text-btn">Show Text</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
