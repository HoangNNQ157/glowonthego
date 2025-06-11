import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const circles = [
  { percent: '85%', label: 'High quality', className: 'orange', z: 3 },
  { percent: '92%', label: 'Package', className: 'blue', z: 2 },
  { percent: '85%', label: 'Trending', className: 'purple', z: 1 },
];

const CircleStats = () => (
  <div className="circle-group">
    {circles.map((c, i) => (
      <motion.div
        className={`circle ${c.className}`}
        style={{zIndex: c.z}}
        key={c.label}
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.6, delay: 0.2 + i * 0.15}}
      >
        <div>
          <div className="percent">{c.percent}</div>
          <div className="label">{c.label}</div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default CircleStats; 