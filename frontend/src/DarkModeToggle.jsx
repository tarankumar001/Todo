import React from 'react';
import './darkmode.css';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      className={`dark-toggle${darkMode ? ' toggled' : ''}`}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle dark mode"
    >
      <div className="toggle-bg day-night-switch-bg">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background gradient/glow */}
          <rect x="0" y="0" width="120" height="60" rx="30" className="toggle-bg-rect day-night-switch-gradient" />
          {/* Stars */}
          <g className={`toggle-stars${darkMode ? ' stars-visible' : ''}`}>
            <circle cx="25" cy="20" r="2" fill="white" />
            <circle cx="40" cy="10" r="1.5" fill="white" />
            <circle cx="60" cy="25" r="1" fill="white" />
            <circle cx="80" cy="15" r="1.2" fill="white" />
            <circle cx="100" cy="30" r="1.7" fill="white" />
          </g>
          {/* Sun and Moon morphing */}
          <g className="moon-sun-group">
            {/* Sun for light mode */}
            <circle
              className={`toggle-sun${!darkMode ? ' sun-visible' : ''}`}
              cx={darkMode ? 30 : 90}
              cy="30"
              r="14"
              fill="#FFD93B"
            />
            {/* Sun rays */}
            {!darkMode && (
              <g className="toggle-sun-rays">
                {[...Array(8)].map((_, i) => (
                  <rect
                    key={i}
                    x={90 - 1.5 + 18 * Math.cos((i * Math.PI) / 4)}
                    y={30 - 4 + 18 * Math.sin((i * Math.PI) / 4)}
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="#FFD93B"
                    transform={`rotate(${i * 45} 90 30)`}
                  />
                ))}
              </g>
            )}
            {/* Moon for dark mode */}
            <circle
              className={`toggle-moon${darkMode ? ' moon-visible' : ''}`}
              cx={darkMode ? 90 : 30}
              cy="30"
              r="18"
              fill={darkMode ? '#F4F4F4' : '#FFFBEA'}
            />
            {/* Moon craters */}
            <circle cx={darkMode ? 98 : 38} cy="25" r="3" fill="#E0E0E0" opacity="0.4" />
            <circle cx={darkMode ? 85 : 27} cy="35" r="2" fill="#E0E0E0" opacity="0.3" />
            <circle cx={darkMode ? 92 : 32} cy="40" r="1.5" fill="#E0E0E0" opacity="0.2" />
          </g>
          {/* Sliding handle */}
          <circle
            className="toggle-handle"
            cx={darkMode ? 90 : 30}
            cy="30"
            r="20"
            fill="rgba(255,255,255,0.15)"
          />
        </svg>
      </div>
    </button>
  );
};

export default DarkModeToggle; 