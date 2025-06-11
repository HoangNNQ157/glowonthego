import React from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

const ProductTableControls = () => {
  return (
    <div className="product-table-controls">
      <div className="product-search-box">
        <FaSearch />
        <input type="text" placeholder="Tìm kiếm sản phẩm" aria-label="Quick search" />
      </div>
      <div className="product-right-controls">
        <select className="product-select-filter" aria-label="Filter by category">
          <option value="">Tất cả danh mục</option>
          {/* Add category options here */}
        </select>
        {/* Add other filter/sort options here if needed */}
      </div>
    </div>
  );
};

export default ProductTableControls; 