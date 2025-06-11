import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const BottomText = () => (
  <motion.div className="bottom-text" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7, delay:0.5}}>
    You've Viewed 43 of 62 Products. <a href="#">LOAD MORE</a>
  </motion.div>
);

export default BottomText; 