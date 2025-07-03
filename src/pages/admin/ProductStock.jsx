import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import StockTable from '../../components/admin/stock/StockTable';
import SalesChart from '../../components/admin/stock/SalesChart';
import ProductService from '../../services/product.service';
import CharmService from '../../services/charm.service';
import { toast } from 'react-toastify';
import '../../styles/admin/stock.scss';


const ProductStock = () => {
  const [activeType, setActiveType] = useState('BRACELET');
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      let response;
      if (activeType === 'BRACELET') {
        response = await ProductService.getBraceletInventory();
      } else {
        response = await CharmService.getCharmInventory();
      }
      const data = response?.data || [];
      setInventoryData(data);
    } catch (error) {
      console.error(`Error fetching ${activeType} inventory:`, error);
      toast.error(`Không thể tải tồn kho ${activeType === 'BRACELET' ? 'Vòng tay' : 'Charm'}.`);
      setInventoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when switching type
    fetchInventory();
  }, [activeType]);

  const paginatedData = inventoryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(inventoryData.length / itemsPerPage);

  const handleAddStock = async (id, name) => {
    const quantity = prompt(`Nhập số lượng để thêm vào kho cho ${name || 'sản phẩm'}:`);
    if (quantity === null || isNaN(quantity) || quantity <= 0) {
      toast.info('Số lượng không hợp lệ.');
      return;
    }

    try {
      if (activeType === 'BRACELET') {
        await ProductService.addBraceletStock(id, parseInt(quantity));
      } else {
        await CharmService.addCharmStock(id, parseInt(quantity));
      }
      toast.success('Thêm tồn kho thành công!');
      fetchInventory();
    } catch (error) {
      console.error(`Error adding stock:`, error);
      toast.error(`Không thể thêm tồn kho.`);
    }
  };

  const handleDistribute = async (id, name) => {
    const quantity = prompt(`Nhập số lượng để phân phối cho ${name}:`);
    if (quantity === null || isNaN(quantity) || quantity <= 0) {
      toast.info('Số lượng không hợp lệ.');
      return;
    }

    try {
      if (activeType === 'BRACELET') {
        await ProductService.addBraceleteQuantity(id, parseInt(quantity));
      } else {
        await CharmService.addCharmQuantity(id, parseInt(quantity));
      }
      toast.success('Phân phối thành công!');
      fetchInventory();
    } catch (error) {
      console.error(`Error distributing stock:`, error);
      toast.error(error.response?.data?.message || 'Không thể phân phối tồn kho.');
    }
  };

  const handleUpdateQuantity = async (id, name) => {
    const newQuantity = prompt(`Nhập số lượng mới cho ${name}:`);
    if (newQuantity === null || isNaN(newQuantity) || newQuantity < 0) {
      toast.info('Số lượng không hợp lệ.');
      return;
    }

    try {
      if (activeType === 'BRACELET') {
        await ProductService.updateBraceleteQuantity(id, parseInt(newQuantity));
      } else {
        await CharmService.updateCharmQuantity(id, parseInt(newQuantity));
      }
      toast.success('Cập nhật số lượng thành công!');
      fetchInventory();
    } catch (error) {
      console.error(`Error updating quantity:`, error);
      toast.error('Không thể cập nhật số lượng.');
    }
  };

  return (
    <div className="container page-enter-active">
      <div className="header-row">
        <div className="type-toggle-buttons">
          <button
            className={`toggle-btn ${activeType === 'CHARM' ? 'active' : ''}`}
            onClick={() => setActiveType('CHARM')}
          >
            CHARM
          </button>
          <button
            className={`toggle-btn ${activeType === 'BRACELET' ? 'active' : ''}`}
            onClick={() => setActiveType('BRACELET')}
          >
            BRACELET
          </button>
        </div>
        <h2>In stock</h2>
        <button className="btn-new-stock" onClick={() => handleAddStock(null, '')}>
          <FaPlus /> New Stock
        </button>
      </div>

      <hr className="divider" />

      {isLoading ? (
        <div>Đang tải tồn kho...</div>
      ) : (
        <>
          <StockTable
            data={paginatedData}
            activeType={activeType}
            onDistribute={handleDistribute}
            onUpdate={handleUpdateQuantity}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀ Trước
              </button>
              <span className="page-info">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau ▶
              </button>
            </div>
          )}
        </>
      )}

      <SalesChart />
    </div>
  );
};

export default ProductStock;
