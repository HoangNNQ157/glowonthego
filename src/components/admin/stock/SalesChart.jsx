import React from 'react';

const SalesChart = () => {
  return (
    <div className="chart-container" role="region" aria-label="Product sales chart">
      <h3 className="chart-title">Product Sales</h3>
      <svg className="bar-chart" viewBox="0 0 1100 250" aria-hidden="true" role="img" focusable="false">
        {/* Y axis lines and labels */}
        <g className="axis y-axis" aria-hidden="true">
          <line x1="50" y1="10" x2="1050" y2="10" stroke="#e6e9f0" />
          <line x1="50" y1="50" x2="1050" y2="50" stroke="#e6e9f0" />
          <line x1="50" y1="90" x2="1050" y2="90" stroke="#e6e9f0" />
          <line x1="50" y1="130" x2="1050" y2="130" stroke="#e6e9f0" />
          <line x1="50" y1="170" x2="1050" y2="170" stroke="#e6e9f0" />
          <line x1="50" y1="210" x2="1050" y2="210" stroke="#e6e9f0" />
          <line x1="50" y1="250" x2="1050" y2="250" stroke="#e6e9f0" />
          <text x="10" y="15" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">1000</text>
          <text x="10" y="55" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">750</text>
          <text x="10" y="95" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">500</text>
          <text x="10" y="135" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">250</text>
          <text x="10" y="175" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">0</text>
        </g>
        {/* X axis labels */}
        <g className="axis x-axis" aria-hidden="true">
          <text x="90" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">0</text>
          <text x="190" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">1</text>
          <text x="290" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">2</text>
          <text x="390" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">3</text>
          <text x="490" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">4</text>
          <text x="590" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">5</text>
          <text x="690" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">6</text>
          <text x="790" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">7</text>
          <text x="890" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">8</text>
          <text x="990" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">9</text>
          <text x="1090" y="270" fill="#6b7280" fontSize="12" fontFamily="Inter, sans-serif">10</text>
        </g>
        {/* Bars */}
        <rect className="bar active" x="70" y="20" width="60" height="220" rx="4" ry="4" />
        <rect className="bar" x="170" y="130" width="60" height="110" rx="4" ry="4" />
        <rect className="bar" x="270" y="140" width="60" height="100" rx="4" ry="4" />
        <rect className="bar" x="370" y="130" width="60" height="110" rx="4" ry="4" />
        <rect className="bar" x="470" y="230" width="60" height="10" rx="4" ry="4" />
        <rect className="bar" x="570" y="130" width="60" height="110" rx="4" ry="4" />
        <rect className="bar" x="670" y="240" width="60" height="0" rx="4" ry="4" />
        <rect className="bar" x="770" y="180" width="60" height="60" rx="4" ry="4" />
        <rect className="bar" x="870" y="130" width="60" height="110" rx="4" ry="4" />
        <rect className="bar" x="970" y="230" width="60" height="10" rx="4" ry="4" />
        <rect className="bar" x="1070" y="200" width="60" height="40" rx="4" ry="4" />
      </svg>
    </div>
  );
};

export default SalesChart; 