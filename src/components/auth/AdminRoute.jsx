import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  let user = null;

  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user data from localStorage:", e);
      localStorage.removeItem('user'); // Clear corrupted data
    }
  }

  console.log(user); // This will now log the parsed object

  // Ensure user exists and roleId is 1 (numeric comparison for safety)
  if (user && Number(user.roleId) === 1) {
    return children ? children : <Outlet />;
  } else {
    // Redirect to home page or an unauthorized page
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute; 