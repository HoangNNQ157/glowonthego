import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import StockTable from '../../components/admin/stock/StockTable';
import SalesChart from '../../components/admin/stock/SalesChart';
import TableControls from '../../components/admin/stock/TableControls';
import ProductService from '../../services/product.service';
import CharmService from '../../services/charm.service';
import { toast } from 'react-toastify';
import '../../styles/admin/stock.scss';

const ProductStock = () => {
  const [activeType, setActiveType] = useState('BRACELET'); // Default to Bracelet
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      try {
        let data;
        if (activeType === 'BRACELET') {
          const response = await ProductService.getBraceletInventory();
          data = response.data;
        } else {
          const response = await CharmService.getCharmInventory();
          data = response.data;
        }
        setInventoryData(Array.isArray(data) ? data : []);
        console.log('Fetched inventory data:', data);
        console.log('Inventory data in state:', Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Error fetching ${activeType} inventory:`, error);
        toast.error(`Không thể tải tồn kho ${activeType === 'BRACELET' ? 'Vòng tay' : 'Charm'}.`);
        setInventoryData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [activeType]);

  const handleAddStock = async (id, name) => {
    const quantity = prompt(`Nhập số lượng để thêm vào kho cho ${name}:`);
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
      // Refresh data after successful add
      const response = activeType === 'BRACELET' 
        ? await ProductService.getBraceletInventory()
        : await CharmService.getCharmInventory();
      setInventoryData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(`Error adding stock for ${activeType}:`, error);
      toast.error(`Không thể thêm tồn kho ${activeType === 'BRACELET' ? 'Vòng tay' : 'Charm'}.`);
    }
  };

  const handleDistribute = async (id, name) => {
    const quantity = prompt(`Nhập số lượng để phân phối cho ${name}:`);
    if (quantity === null || isNaN(quantity) || quantity <= 0) {
      toast.info('Số lượng không hợp lệ.');
      return;
    }
    console.log(`Distributing ${activeType} - ID: ${id}, Quantity: ${parseInt(quantity)}`);
    try {
        if (activeType === 'BRACELET') {
            await ProductService.addBraceleteQuantity(id, parseInt(quantity));
        } else {
            await CharmService.addCharmQuantity(id, parseInt(quantity));
        }
        toast.success('Phân phối thành công!');
        const response = activeType === 'BRACELET' 
            ? await ProductService.getBraceletInventory()
            : await CharmService.getCharmInventory();
        setInventoryData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error(`Error distributing ${activeType}:`, error);
        toast.error(error.response?.data?.message || `Không thể phân phối ${activeType === 'BRACELET' ? 'Vòng tay' : 'Charm'}.`);
    }
  };

  const handleUpdateQuantity = async (id, name) => {
    const newQuantity = prompt(`Nhập số lượng mới cho ${name}:`);
    if (newQuantity === null || isNaN(newQuantity) || newQuantity < 0) {
      toast.info('Số lượng không hợp lệ.');
      return;
    }
    console.log(`Updating ${activeType} Quantity - ID: ${id}, New Quantity: ${parseInt(newQuantity)}`);
    try {
        if (activeType === 'BRACELET') {
            await ProductService.updateBraceleteQuantity(id, parseInt(newQuantity));
        } else {
            await CharmService.updateCharmQuantity(id, parseInt(newQuantity));
        }
        toast.success('Cập nhật số lượng thành công!');
        const response = activeType === 'BRACELET' 
            ? await ProductService.getBraceletInventory()
            : await CharmService.getCharmInventory();
        setInventoryData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error(`Error updating quantity for ${activeType}:`, error);
        toast.error(`Không thể cập nhật số lượng ${activeType === 'BRACELET' ? 'Vòng tay' : 'Charm'}.`);
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
        <button className="btn-new-stock" onClick={() => handleAddStock(null, '')}> {/* ID and Name will be picked from the table rows or through a modal later */}
          <FaPlus /> New Stock
        </button>
      </div>
      <hr className="divider" />
      
      <TableControls />
      {isLoading ? (
        <div>Đang tải tồn kho...</div>
      ) : (
        <StockTable 
          data={inventoryData} 
          activeType={activeType}
          onDistribute={handleDistribute}
          onUpdate={handleUpdateQuantity}
        />
      )}
      
      <SalesChart />
    </div>
  );
};

export default ProductStock; 