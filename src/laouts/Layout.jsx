import React from 'react';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  return (
   
      <div className="app-mobile-container">
        <Navbar />
        <main className="content">
          {children}
        </main>
      </div>
  );
};

export default Layout;
