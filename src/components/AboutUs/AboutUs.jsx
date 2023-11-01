import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="image-container">
          <div className="image-box image-box1">
            <img src="/pic1.png" alt="first" />
          </div>
           <ArrowForwardIosIcon />
          <div className="image-box image-box2">
            <img src="/pillarlogo.png" alt="second" className="pillar-image" />
           
          </div>
          <ArrowForwardIosIcon />
          <div className="arrow"></div>
          <div className="image-box image-box3">
            <img src="/pic3.png" alt="third" />
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

