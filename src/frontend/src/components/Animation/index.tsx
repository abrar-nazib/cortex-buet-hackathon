import React from "react";
import './TrainAnimation.css'; // Assuming you have a CSS file for additional global styles

const TrainAnimation = () => {
  return (
    <div className="train-container">
      <svg viewBox="0 0 92.12 92.12" className="train-svg">
        <defs>
          <linearGradient id="linear-gradient" x1="45.62" y1="-20.28" x2="46.23" y2="71.84" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2ca58d" />
            <stop offset="1" stopColor="#0a2342" />
          </linearGradient>
        </defs>
        <title>train</title>
        <circle id="body" className="cls-1" cx="46.06" cy="46.06" r="46.06" />
        <path
          className="cls-2"
          d="M89.75,43.91,83.64,32.67,69.57,45.86,52.35,27,27.41,49.75l-14.76-11L2.88,51.92A43.38,43.38,0,0,0,7,64.73l78.63-.1a51.9,51.9,0,0,0,4.13-19.57C89.78,44.68,89.76,44.3,89.75,43.91Zm-74.9,1.95L13.6,47.6l-2.23-1.73L8.29,47.6l4.63-6.13,8.5,6.13Zm40.84-9-.94,2.72-4.28-2.93-6.75,1,8.64-8.13L63.29,41.93ZM83.39,40l-2.86,2.48-.38-2.39L77.3,41l5.93-5.48,3.51,5.89Z"
        />
        <path
          className="cls-3 train"
          d="M185.41,53.82H171.67a1.81,1.81,0,0,0-1.55,1.67v3.33h-2V55.48c0-.76-.35-1.67-1.11-1.67H153.28c-.76,0-2.16.91-2.16,1.67v3.33h-1V55.48a1.8,1.8,0,0,0-1.54-1.67H134.85a2,2,0,0,0-1.73,1.67v3.33h-2V55.48c0-.76-.17-1.67-.93-1.67H116.46c-.76,0-1.34.91-1.34,1.67v3.33h-2V51.76c0-.67-.74-.95-1.42-.95h-6.51c-.67,0-1.07.27-1.07.95v2.05h-6v-.37c0-.13.72-.48.72-.89a2.52,2.52,0,0,0-1.72-1.64,2.53,2.53,0,0,0-1.73,1.64c0,.42.73.77.73.89v.37h0a3.94,3.94,0,0,0-3.79,4.06,4.24,4.24,0,0,0,.29,1.7,2.66,2.66,0,0,0-1.24,2c.05.71.19.61,4.32.6,0,0,0,.08,0,.12a1.63,1.63,0,0,0,1.62,1.63,1.68,1.68,0,0,0,1.63-1.69,1.52,1.52,0,0,0,0-.4h1a1.57,1.57,0,0,0,0,.4,1.63,1.63,0,1,0,3.26,0,1.42,1.42,0,0,0,0-.39H106a2.54,2.54,0,0,0,4.94,0h.79c.67,0,1.42-.42,1.42-1.09v-.91h2v.76a1.24,1.24,0,0,0,1.34,1.24h.13a1.68,1.68,0,0,0,1.6,2,1.67,1.67,0,0,0,1.63-1.68,1.44,1.44,0,0,0,0-.29h7a1.68,1.68,0,0,0,1.6,2,1.67,1.67,0,0,0,1.63-1.68,1.44,1.44,0,0,0,0-.29h.15c.76,0,.93-.48.93-1.24v-.76h2v.76c0,.76,1,1.24,1.73,1.24h.32a1.68,1.68,0,0,0,1.6,2,1.67,1.67,0,0,0,1.63-1.68,1.44,1.44,0,0,0,0-.29h7a1.68,1.68,0,0,0,1.6,2,1.61,1.61,0,0,0,1.63-1.61c0-.09.07-.16.06-.24a1.44,1.44,0,0,0,1.42-1.36v-.76h1v.76c0,.76,1.4,1.24,2.16,1.24h.13a1.68,1.68,0,0,0,1.6,2,1.67,1.67,0,0,0,1.63-1.68,1.44,1.44,0,0,0,0-.29h7a1.68,1.68,0,0,0,1.6,2,1.61,1.61,0,0,0,1.63-1.61c0-.09-.34-.16-.35-.24.74,0,1-.61,1-1.36V55.48C186.12,54.73,186.17,53.82,185.41,53.82Z"
        />
        <polygon className="cls-3" points="6.46 63.93 85.65 63.32 85.22 66.07 77.55 76.73 68.17 84.15 57.08 88.65 47.84 90 34.54 88.54 22.17 83.01 11.53 72.88 6.46 63.93" />
        <circle id="body-2" data-name="body" className="cls-4" cx="46.06" cy="46.06" r="43.72" />
      </svg>
    </div>
  );
};

export default TrainAnimation;
