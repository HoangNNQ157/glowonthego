import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.scss'; // We will create this file for styling

const OrderSuccess = () => {
  return (
    <div className="order-status-page">
      <div className="order-status-container success">
        <h1>Order Placed Successfully!</h1>
        <p>Your order has been placed and is being processed.</p>
        <p>Thank you for your purchase!</p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess; 