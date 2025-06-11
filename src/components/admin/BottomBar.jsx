import React from 'react';
import { FaUsers, FaUser, FaDesktop } from 'react-icons/fa';
import { motion } from 'framer-motion';

const items = [
  {
    icon: React.createElement(FaUsers, null), label: 'Total Customers', value: '5,423', change: '10% this month', up: true
  },
  {
    icon: React.createElement(FaUser, null), label: 'Members', value: '1,893', change: '1% this month', up: false
  },
  {
    icon: React.createElement(FaDesktop, null), label: 'Active View', value: '189', change: null, up: null
  },
];

const BottomBar = () => (
  React.createElement(motion.div, { className: "bottom-bar", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.5 } },
    items.map((item, i) => (
      React.createElement(motion.div, { className: "item", key: i, initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.6 + i * 0.1 } },
        React.createElement("div", { className: "icon-circle", style: item.up === false ? {} : item.up === true ? {} : { color: '#3a9a3a', background: '#d9f7e0' } }, item.icon),
        React.createElement("div", { className: "text-group" },
          React.createElement("div", { className: "label" }, item.label),
          React.createElement("div", { className: "value" }, item.value),
          item.change && (
            React.createElement("div", { className: `change ${item.up ? 'up' : 'down'}` },
              item.up ? (
                React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 16 16" }, React.createElement("path", { d: "M8 3L8 13", stroke: "#3a9a3a", strokeWidth: "2", strokeLinecap: "round" }), React.createElement("path", { d: "M5 6L8 3L11 6", stroke: "#3a9a3a", strokeWidth: "2", strokeLinejoin: "round" }))
              ) : (
                React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 16 16" }, React.createElement("path", { d: "M8 13L8 3", stroke: "#ff4d4d", strokeWidth: "2", strokeLinecap: "round" }), React.createElement("path", { d: "M11 10L8 13L5 10", stroke: "#ff4d4d", strokeWidth: "2", strokeLinejoin: "round" }))
              ),
              item.change
            )
          )
        )
      )
    ))
  )
);

export default BottomBar; 