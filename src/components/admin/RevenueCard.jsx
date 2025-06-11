import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const barData = [
  { thisWeek: 90, lastWeek: 60 },
  { thisWeek: 70, lastWeek: 90 },
  { thisWeek: 90, lastWeek: 40 },
  { thisWeek: 60, lastWeek: 90 },
  { thisWeek: 100, lastWeek: 70 },
  { thisWeek: 80, lastWeek: 40 },
  { thisWeek: 70, lastWeek: 90 },
  { thisWeek: 90, lastWeek: 70 },
  { thisWeek: 60, lastWeek: 40 },
  { thisWeek: 90, lastWeek: 70 },
  { thisWeek: 100, lastWeek: 80 },
  { thisWeek: 110, lastWeek: 50 },
];
const barLabels = ['01','02','03','04','05','06','07','08','09','10','11','12'];

const RevenueCard = () => (
  <motion.div className="card-revenue" initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}}>
    <div className="top-row">
      <div className="left-info">
        <p>Revenue</p>
        <p className="amount">IDR 7.852.000</p>
        <div className="percent">
          <svg width="12" height="12" viewBox="0 0 16 16"><path d="M8 3L8 13" stroke="#7DBD7D" strokeWidth="2" strokeLinecap="round"/><path d="M5 6L8 3L11 6" stroke="#7DBD7D" strokeWidth="2" strokeLinejoin="round"/></svg>
          2.1% vs last week
        </div>
        <p className="subtext">Sales from 1-12 Dec, 2020</p>
      </div>
      <button className="btn-view-report">View Report</button>
    </div>
    <div className="chart-container">
      <motion.div className="bar-chart" initial="hidden" animate="visible" variants={{hidden:{},visible:{transition:{staggerChildren:0.05}}}}>
        {barData.map((d, i) => (
          <React.Fragment key={i}>
            <motion.div className="bar this-week" style={{height: d.thisWeek}} initial={{scaleY:0}} animate={{scaleY:1}} transition={{duration:0.5, delay:i*0.04}} />
            <motion.div className="bar last-week" style={{height: d.lastWeek}} initial={{scaleY:0}} animate={{scaleY:1}} transition={{duration:0.5, delay:i*0.04+0.02}} />
          </React.Fragment>
        ))}
      </motion.div>
      <div className="bar-labels">
        {barLabels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <div className="legend">
        <div className="item this-week"><span className="color-box"></span>Last 7 days</div>
        <div className="item last-week"><span className="color-box"></span>Last Week</div>
      </div>
    </div>
  </motion.div>
);

export default RevenueCard; 