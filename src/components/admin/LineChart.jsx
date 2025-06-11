import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const LineChart = () => (
  <motion.section className="line-chart-container" initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7, delay:0.3}}>
    <div className="line-chart-header">
      <div>Sales</div>
      <div className="percent">
        <svg width="12" height="12" viewBox="0 0 16 16"><path d="M8 13L8 3" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round"/><path d="M11 10L8 13L5 10" stroke="#ff4d4d" strokeWidth="2" strokeLinejoin="round"/></svg>
        <span className="text">2.1% vs last week</span>
      </div>
    </div>
    <svg className="line-chart-svg" viewBox="0 0 280 140">
      <line x1="0" y1="20" x2="280" y2="20" className="grid-line" />
      <line x1="0" y1="50" x2="280" y2="50" className="grid-line" />
      <line x1="0" y1="80" x2="280" y2="80" className="grid-line" />
      <line x1="0" y1="110" x2="280" y2="110" className="grid-line" />
      <polyline className="line1" points="0,110 40,130 80,90 120,100 160,80 200,90 240,90 280,20" />
      <polyline className="line2" points="0,80 40,50 80,110 120,90 160,100 200,80 240,110 280,90" />
    </svg>
    <div className="line-chart-legend">
      <div className="item last-8"><div className="color-box"></div>Last 8 days</div>
      <div className="item last-week"><div className="color-box"></div>Last Week</div>
    </div>
  </motion.section>
);

export default LineChart; 