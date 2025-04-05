import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, threshold }) => {
  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span>Free gift at ₹{threshold}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;