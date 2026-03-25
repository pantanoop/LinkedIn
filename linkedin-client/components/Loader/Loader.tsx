"use client";

import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="logo">
          Linked<span>in</span>
        </div>

        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
}
