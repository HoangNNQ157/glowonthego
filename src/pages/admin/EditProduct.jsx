import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../../services/product.service';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify if not already in App.jsx
import { toast } from 'react-toastify'; // Import toast
import './editProduct.scss'; // We will create this file later for styling

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await ProductService.getProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError('Không thể tải thông tin sản phẩm');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true); // Maybe use a separate loading state for saving
            await ProductService.updateProduct(id, product);
            toast.success('Cập nhật sản phẩm thành công!'); // Use toast for success
            navigate('/admin/product'); // Navigate back to product list
        } catch (err) {
            setError('Không thể cập nhật sản phẩm');
            console.error('Error updating product:', err);
        } finally {
            setLoading(false); // Reset saving loading state
        }
    };

    if (loading && !product) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Không tìm thấy sản phẩm</div>; // Should not happen if fetchProduct sets error, but good fallback

    return (
        <div className="edit-product-container">
            <h1>Chỉnh sửa sản phẩm: {product.braceleteName}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên sản phẩm:</label>
                    <input
                        type="text"
                        name="braceleteName"
                        value={product.braceleteName || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Giá:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Add other fields here based on your product structure */}
                {/* Examples: materialId, themeId, description, color, size, quantity, image, isActive */}
                <div>
                    <label>Mô tả:</label>
                    <textarea
                        name="description"
                        value={product.description || ''}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                 <div>
                    <label>Mã chất liệu (materialId):</label>
                    <input
                        type="number"
                        name="materialId"
                        value={product.materialId || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Mã chủ đề (themeId):</label>
                    <input
                        type="number"
                        name="themeId"
                        value={product.themeId || ''}
                        onChange={handleInputChange}
                    />
                </div>
                 <div>
                    <label>Màu sắc:</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color || ''}
                        onChange={handleInputChange}
                    />
                </div>
                 <div>
                    <label>Kích thước:</label>
                    <input
                        type="text"
                        name="size"
                        value={product.size || ''}
                        onChange={handleInputChange}
                    />
                </div>
                 <div>
                    <label>Số lượng:</label>
                     {/* Note: API has separate endpoints for quantity updates. 
                         Editing quantity here via PUT /bracelete/{id} might not be the intended way. 
                         Consider using the dedicated PUT /bracelete/{id}/quantity if needed. 
                         For now, including it in the main form.*/}
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>URL Hình ảnh:</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Trạng thái kích hoạt (isActive):</label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={product.isActive || false}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Cập nhật sản phẩm</button>
            </form>
        </div>
    );
};

export default EditProduct; 