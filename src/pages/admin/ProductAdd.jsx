import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../services/product.service';
import MaterialService from '../../services/material.service';
import ThemeService from '../../services/theme.service';
import { toast } from 'react-toastify';
import '../../styles/admin/productAdd.scss';

const ProductAdd = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [themes, setThemes] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [productData, setProductData] = useState({
    braceleteName: '',
    price: 0,
    description: '',
    materialId: '',
    themeId: '',
    color: '',
    size: '',
    quantity: 0,
    image: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Fetch materials and themes when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [materialsResponse, themesResponse] = await Promise.all([
          MaterialService.getAllMaterials(),
          ThemeService.getAllThemes()
        ]);
        setMaterials(Array.isArray(materialsResponse.data) ? materialsResponse.data : []);
        setThemes(Array.isArray(themesResponse.data) ? themesResponse.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Không thể tải dữ liệu chất liệu và chủ đề');
        setMaterials([]);
        setThemes([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...productData,
        price: parseFloat(productData.price),
        materialId: parseInt(productData.materialId),
        themeId: parseInt(productData.themeId),
        quantity: parseInt(productData.quantity),
      };
      
      await ProductService.createProduct(dataToSend);
      toast.success('Thêm sản phẩm thành công!');
      navigate('/admin/product');
    } catch (err) {
      toast.error('Không thể thêm sản phẩm.');
      console.error('Error adding product:', err);
      setLoading(false);
    }
  };

  return (
    <div className="product-add-container page-enter-active">
      <h1 className="product-add-header">Thêm sản phẩm mới</h1>
      
      <form onSubmit={handleSubmit} className="product-form-grid">
        {/* Left Section: Images and Details */}
        <div>
          <div className="product-image-section">
            <div className="form-group">
              <label htmlFor="image">URL Hình ảnh</label>
              <input 
                type="text" 
                id="image" 
                name="image"
                value={productData.image}
                onChange={handleInputChange}
                placeholder="Nhập URL hình ảnh" 
              />
            </div>
          </div>

          <div className="product-details-section">
            <div className="form-group">
              <label htmlFor="braceleteName">Tên sản phẩm</label>
              <input 
                type="text" 
                id="braceleteName" 
                name="braceleteName"
                value={productData.braceleteName}
                onChange={handleInputChange}
                placeholder="Nhập tên sản phẩm" 
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Giá</label>
              <input 
                type="number" 
                id="price" 
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Nhập giá" 
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="materialId">Chất liệu</label>
              <select
                id="materialId"
                name="materialId"
                value={productData.materialId}
                onChange={handleInputChange}
                required
                disabled={isLoadingData}
              >
                <option value="">Chọn chất liệu</option>
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.materialName}
                  </option>
                ))}
              </select>
              {isLoadingData && <span className="loading-text">Đang tải...</span>}
            </div>
            <div className="form-group">
              <label htmlFor="themeId">Chủ đề</label>
              <select
                id="themeId"
                name="themeId"
                value={productData.themeId}
                onChange={handleInputChange}
                required
                disabled={isLoadingData}
              >
                <option value="">Chọn chủ đề</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.themeName}
                  </option>
                ))}
              </select>
              {isLoadingData && <span className="loading-text">Đang tải...</span>}
            </div>
             <div className="form-group">
              <label htmlFor="color">Màu sắc</label>
              <input 
                type="text" 
                id="color" 
                name="color"
                value={productData.color}
                onChange={handleInputChange}
                placeholder="Nhập màu sắc" 
              />
            </div>
             <div className="form-group">
              <label htmlFor="size">Kích thước</label>
              <input 
                type="text" 
                id="size" 
                name="size"
                value={productData.size}
                onChange={handleInputChange}
                placeholder="Nhập kích thước" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Số lượng</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                placeholder="Nhập số lượng" 
                required
              />
            </div>
             <div className="form-group">
                <label htmlFor="isActive">Kích hoạt</label>
                <input 
                    type="checkbox" 
                    id="isActive" 
                    name="isActive"
                    checked={productData.isActive}
                    onChange={handleInputChange}
                />
            </div>

          </div>
        </div>

        {/* Right Section: Description */}
        <div>
          <div className="form-group">
            <label htmlFor="description">Mô tả chi tiết</label>
            <textarea 
                id="description" 
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả chi tiết">
            </textarea>
          </div>

          <button type="submit" className="add-product-button" disabled={loading}>
             {loading ? 'Đang thêm...' : 'THÊM SẢN PHẨM'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd; 