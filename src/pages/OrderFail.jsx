import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.scss'; // Reuse the same styling file

const OrderFail = () => {
  return (
    <div className="order-status-page">
      <div className="order-status-container fail">
        <h1>Order Failed!</h1>
        <p>There was an issue processing your order. Please try again.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderFail; 