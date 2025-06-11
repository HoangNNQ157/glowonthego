import React from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

const TableControls = () => {
  return (
    <div className="table-controls">
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Quick search" aria-label="Quick search" />
      </div>
      <div className="right-controls">
        <button className="date-btn" aria-label="Select date">
          <FaCalendarAlt />
        </button>
        <select className="select-status" aria-label="Filter by status">
          <option>Status</option>
          <option>Active</option>
          <option>Pending</option>
        </select>
      </div>
    </div>
  );
};

export default TableControls; 