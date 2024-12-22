import React from 'react';
import Navbar from './components/NavbarAB';

const VRPage = () => {
  return (
    <div className="vr-page-container" style={{ display: 'flex', height: '100vh',width:"100vw" }}>
      {/* Sidebar */}
      <Navbar style={{ width: '250px', flexShrink: 0 }} />
      
      {/* Main content with iframe */}
      <div className="vr-content" style={{ flex: 1 }}>
        <iframe
          src="http://127.0.0.1:5500/panorama/index.html"
          width="100%"
          height="100%"
          title="Panorama VR"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default VRPage;