import React from 'react';
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminHeader = () => (
  React.createElement(motion.header, { className: "admin-header", initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } },
    React.createElement("div", { className: "profile-circle" }, "ADM H"),
    React.createElement("div", { className: "dropdown-arrow" }),
    React.createElement("div", { className: "bell-icon" },
      React.createElement(FaBell, null),
      React.createElement("span", { className: "notification-dot" })
    )
  )
);

export default AdminHeader; 