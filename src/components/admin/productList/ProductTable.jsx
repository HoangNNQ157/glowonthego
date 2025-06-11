import React from 'react';

const ProductTable = () => {
  const productsData = [
    {
      id: '#PROD001',
      image: 'https://via.placeholder.com/50',
      name: 'Sản phẩm A',
      category: 'Điện tử',
      price: '1.500.000₫',
      status: 'Active',
    },
    {
      id: '#PROD002',
      image: 'https://via.placeholder.com/50',
      name: 'Sản phẩm B',
      category: 'Gia dụng',
      price: '800.000₫',
      status: 'Inactive',
    },
    {
      id: '#PROD003',
      image: 'https://via.placeholder.com/50',
      name: 'Sản phẩm C',
      category: 'Điện tử',
      price: '2.200.000₫',
      status: 'Active',
    },
    {
      id: '#PROD004',
      image: 'https://via.placeholder.com/50',
      name: 'Sản phẩm D',
      category: 'Thời trang',
      price: '350.000₫',
      status: 'Active',
    },
    {
      id: '#PROD005',
      image: 'https://via.placeholder.com/50',
      name: 'Sản phẩm E',
      category: 'Gia dụng',
      price: '1.100.000₫',
      status: 'Inactive',
    },
  ];

  return (
    <table className="product-list-table" aria-label="Product list table">
      <thead>
        <tr>
          <th><input type="checkbox" aria-label="Select all products" /></th>
          <th>ID</th>
          <th></th>{/* Column for image */}
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((product, index) => (
          <tr key={index}>
            <td><input type="checkbox" aria-label={`Select product ${product.name}`} /></td>
            <td>{product.id}</td>
            <td><img src={product.image} alt={`Image of ${product.name}`} /></td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>
              <span className={`product-status-pill status-${product.status.toLowerCase()}`}>
                {product.status === 'Active' ? 'Đang bán' : 'Ngừng bán'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable; 