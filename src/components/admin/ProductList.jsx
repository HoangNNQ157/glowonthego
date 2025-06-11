import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const rightList = [
  { name: 'Summer bracelet', price: 'IDR 45,000' },
  { name: 'Summer bracelet', price: 'IDR 78,000' },
  { name: 'Summer bracelet', price: 'IDR 45,000' },
  { name: 'Summer bracelet', price: 'IDR 45,000' },
];

const ProductList = () => (
  <div className="right-list">
    {rightList.map((item, i) => (
      <motion.div
        className="item"
        key={i}
        initial={{opacity: 0, x: 30}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5, delay: 0.2 + i * 0.1}}
      >
        <div className="circle-icon"></div>
        <div className="text">{item.name}</div>
        <div className="price">{item.price}</div>
      </motion.div>
    ))}
  </div>
);

export default ProductList; 