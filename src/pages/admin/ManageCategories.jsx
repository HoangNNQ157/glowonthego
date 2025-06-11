import React, { useState } from 'react';

const TABS = [
  { key: 'charmCategory', label: 'Charm Category' },
  { key: 'material', label: 'Material' },
  { key: 'theme', label: 'Theme' },
];

const ManageCategories = () => {
  const [activeTab, setActiveTab] = useState('charmCategory');

  return (
    <div className="manage-categories-container">
      <h1>Quản lý Danh mục</h1>
      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'charmCategory' && (
          <div>Quản lý Charm Category (danh sách, thêm, sửa, xóa)</div>
        )}
        {activeTab === 'material' && (
          <div>Quản lý Material (danh sách, thêm, sửa, xóa)</div>
        )}
        {activeTab === 'theme' && (
          <div>Quản lý Theme (danh sách, thêm, sửa, xóa)</div>
        )}
      </div>
    </div>
  );
};

export default ManageCategories; 