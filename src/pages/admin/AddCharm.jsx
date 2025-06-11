import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharmService from '../../services/charm.service';
import CategoryService from '../../services/category.service';
import { toast } from 'react-toastify';
import './addCharm.scss'; // Assuming a SCSS file for styling

const AddCharm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // State for form data - Adjust properties based on your Charm API structure
  const [charmData, setCharmData] = useState({
    charmName: '',
    price: 0,
    description: '',
    charmCategoryId: '',
    // Add other fields like color, size, quantity, image, isActive based on your API
    color: '',
    size: '',
    quantity: 0,
    image: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCharmCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Không thể tải danh mục Charm');
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCharmData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Convert numeric strings to numbers if necessary
        const dataToSend = {
            ...charmData,
            price: parseFloat(charmData.price), // Convert price to number
            charmCategoryId: parseInt(charmData.charmCategoryId), // Convert charmCategoryId to integer
            quantity: parseInt(charmData.quantity), // Convert quantity to integer
        };
        
      await CharmService.createCharm(dataToSend);
      toast.success('Thêm Charm thành công!');
      navigate('/admin/manage-charm'); // Navigate back to charm list after adding
    } catch (err) {
      toast.error('Không thể thêm Charm.');
      console.error('Error adding charm:', err);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="add-charm-container">
      <h1>Thêm Charm mới</h1>
      
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="charmName">Tên Charm:</label>
            <input 
              type="text" 
              id="charmName" 
              name="charmName"
              value={charmData.charmName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Giá:</label>
            <input 
              type="number" 
              id="price" 
              name="price"
              value={charmData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Mô tả:</label>
            <textarea 
                id="description" 
                name="description"
                value={charmData.description}
                onChange={handleInputChange}
            ></textarea>
          </div>
           <div>
            <label htmlFor="charmCategoryId">Danh mục Charm:</label>
            <select
              id="charmCategoryId"
              name="charmCategoryId"
              value={charmData.charmCategoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
           <div>
            <label htmlFor="color">Màu sắc:</label>
            <input 
              type="text" 
              id="color" 
              name="color"
              value={charmData.color}
              onChange={handleInputChange}
            />
          </div>
           <div>
            <label htmlFor="size">Kích thước:</label>
            <input 
              type="text" 
              id="size" 
              name="size"
              value={charmData.size}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Số lượng:</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity"
              value={charmData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
           <div>
            <label htmlFor="image">URL Hình ảnh:</label>
            <input 
              type="text" 
              id="image" 
              name="image"
              value={charmData.image}
              onChange={handleInputChange}
            />
          </div>
           <div>
              <label htmlFor="isActive">Kích hoạt:</label>
              <input 
                  type="checkbox" 
                  id="isActive" 
                  name="isActive"
                  checked={charmData.isActive}
                  onChange={handleInputChange}
              />
          </div>

          <button type="submit" disabled={loading}>
             {loading ? 'Đang thêm...' : 'THÊM CHARM'}
          </button>
      </form>
    </div>
  );
};

export default AddCharm; 