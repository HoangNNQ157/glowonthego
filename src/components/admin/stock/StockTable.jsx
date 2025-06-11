import React from 'react';

const StockTable = ({ data, activeType, onDistribute, onUpdate }) => {
  return (
    <table aria-label="Stock table">
      <thead>
        <tr>
          <th><input type="checkbox" aria-label="Select all" /></th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Update</th>
          <th>Distribute</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={activeType === 'BRACELET' ? item.item1?.id : item.id}>
              <td data-label="Select">
                <input type="checkbox" aria-label={`Select row ${activeType === 'BRACELET' ? item.item1?.id : item.id}`} />
              </td>
              <td data-label="Product">
                {activeType === 'BRACELET' ? item.item1?.braceleteName : item.charm?.charmName}
              </td>
              <td data-label="Quantity">
                {activeType === 'BRACELET' ? item.item2 : item.quantityInStock}
              </td>
              <td data-label="Update">
                <div className="action-buttons">
                  <button 
                    className="action-btn"
                    onClick={() => onUpdate(
                      activeType === 'BRACELET' ? item.item1?.id : item.id, 
                      activeType === 'BRACELET' ? item.item1?.braceleteName : item.charm?.charmName
                    )}
                  >
                    Adjust
                  </button>
                </div>
              </td>
              <td data-label="Distribute">
                <div className="action-buttons">
                  <button 
                    className="action-btn"
                    onClick={() => onDistribute(
                      activeType === 'BRACELET' ? item.item1?.id : item.id,
                      activeType === 'BRACELET' ? item.item1?.braceleteName : item.charm?.charmName
                    )}
                  >
                    Distribute
                  </button>
                </div>
              </td>
              <td data-label="Status">
                <span className={`status-pill status-${(activeType === 'BRACELET' ? item.item1?.isActive : item.charm?.isActive) ? 'active' : 'pending'}`}>
                  {(activeType === 'BRACELET' ? item.item1?.isActive : item.charm?.isActive) ? 'Active' : 'Pending'}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Không có dữ liệu tồn kho.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StockTable; 