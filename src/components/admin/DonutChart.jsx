import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const DonutChart = () => (
  <motion.section className="donut-chart-container" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{duration:0.7, delay:0.2}}>
    <button className="btn-small">View Report</button>
    <div className="donut-chart">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle className="bg" cx="70" cy="70" r="54" />
        <circle className="progress" cx="70" cy="70" r="54" strokeDasharray="339.292" strokeDashoffset="203.575" />
        <circle className="progress2" cx="70" cy="70" r="54" strokeDasharray="339.292" strokeDashoffset="231.5" />
        <circle className="progress3" cx="70" cy="70" r="54" strokeDasharray="339.292" strokeDashoffset="244.5" />
      </svg>
      <div className="tooltip visible" style={{top:'50%', left:'50%'}}>
        <strong>/afternoon</strong>
        <p>1pm - 4pm</p>
        <p>1,899 orders</p>
      </div>
    </div>
    <div className="donut-legend">
      <div className="item adult"><div className="color-circle"></div>Afternoon 40%</div>
      <div className="item beg"><div className="color-circle"></div>Beginning 32%</div>
      <div className="item morn"><div className="color-circle"></div>Morning 28%</div>
    </div>
  </motion.section>
);

export default DonutChart; 