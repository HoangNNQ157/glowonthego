import { useState, useEffect } from 'react';
import ProductService from '../../services/product.service';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './productList.scss';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for search parameters
    const [searchParams, setSearchParams] = useState({
        minPrice: '',
        maxPrice: '',
        materialId: '',
        themeId: '',
        braceletName: '',
    });

    // State to trigger search explicitly
    const [triggerSearch, setTriggerSearch] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);

    useEffect(() => {
        // Only call search if at least one search parameter is not empty
        const isSearchParamsEmpty = Object.values(searchParams).every(param => param === '');
        
        if (isSearchParamsEmpty) {
             // If search params are empty, fetch all products (or initial list)
             fetchProducts(); 
        } else {
            // Otherwise, perform the search
            searchProducts();
        }

    }, [currentPage, triggerSearch]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // This will fetch the initial list or list when search params are cleared
            const response = await ProductService.getAllProducts({ page: currentPage });
            console.log('Fetch all products response:', response);
            setProducts(response || []);
            setTotalPages(response?.totalPages || 1);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách sản phẩm');
            console.error('Error fetching products:', err);
            setProducts([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async () => {
         try {
            setLoading(true);
            // Prepare search parameters, filtering out empty values
            const activeSearchParams = Object.fromEntries(
                Object.entries(searchParams).filter(([, value]) => value !== '')
            );

            // Add pagination to search parameters
            const searchPayload = {
                 ...activeSearchParams,
                 page: currentPage,
            };

            // Call the search service function (ProductService.searchProducts already updated)
            const response = await ProductService.searchProducts(searchPayload);
            console.log('Search products response:', response);
            setProducts(response || []);
            setTotalPages(response?.totalPages || 1);
            setError(null);
         } catch (err) {
            setError('Không thể tìm kiếm sản phẩm');
            console.error('Error searching products:', err);
            setProducts([]);
            setTotalPages(1);
         } finally {
            setLoading(false);
         }
    };

    // Handle input changes for search parameters
    const handleSearchInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value,
        }));
        // Do NOT reset page here. Reset happens on explicit search button click.
        // setCurrentPage(1);
    };

    // Handle explicit search button click
    const handleSearch = () => {
        setCurrentPage(1); // Reset to page 1 for new search
        setTriggerSearch(prev => prev + 1); // Increment to trigger useEffect
    };

    const handleDelete = (id) => {
        // Show custom confirmation dialog instead of window.confirm
        setProductToDeleteId(id);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await ProductService.deleteProduct(productToDeleteId);
            toast.success('Xóa sản phẩm thành công!');
            // After deleting, re-fetch the current list based on current search/pagination
            const isSearchParamsEmpty = Object.values(searchParams).every(param => param === '');
            if (isSearchParamsEmpty) {
                 fetchProducts(); 
            } else {
                searchProducts();
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Không thể xóa sản phẩm');
            toast.error('Không thể xóa sản phẩm.');
        } finally {
            // Hide dialog and reset state
            setShowConfirmDialog(false);
            setProductToDeleteId(null);
        }
    };

    const cancelDelete = () => {
        // Hide dialog and reset state
        setShowConfirmDialog(false);
        setProductToDeleteId(null);
    };

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error && products.length === 0) return <div className="error">{error}</div>;

    return (
        <div className="product-list">
            <div className="product-list__header">
                <h1>Danh sách sản phẩm</h1>
                <div className="product-list__search">
                    <div className="search-row">
                        <input
                            type="text"
                            name="braceletName"
                            placeholder="Tìm kiếm tên sản phẩm..."
                            value={searchParams.braceletName}
                            onChange={handleSearchInputChange}
                        />
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Giá từ..."
                            value={searchParams.minPrice}
                            onChange={handleSearchInputChange}
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Giá đến..."
                            value={searchParams.maxPrice}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="search-row">
                         <input
                            type="number"
                            name="materialId"
                            placeholder="Mã chất liệu..."
                            value={searchParams.materialId}
                            onChange={handleSearchInputChange}
                        />
                         <input
                            type="number"
                            name="themeId"
                            placeholder="Mã chủ đề..."
                            value={searchParams.themeId}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <button className="search-button" onClick={handleSearch} disabled={loading}>
                    Tìm kiếm
                </button>
                <button className="add-product-btn" onClick={() => window.location.href = '/admin/add-product'}>
                    Thêm sản phẩm mới
                </button>
            </div>

            <div className="product-list__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Danh mục</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.braceleteName}</td>
                                <td>{product.price?.toLocaleString('vi-VN')}đ</td>
                                <td>{product.materialId}</td>
                                <td>
                                    <span className={`status ${product.isActive ? 'active' : 'inactive'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="edit"
                                            onClick={() => window.location.href = `/admin/edit-product/${product.id}`}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {!loading && !error && products.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>Không tìm thấy sản phẩm nào phù hợp.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="product-list__pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || loading}
                >
                    Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || loading}
                >
                    Sau
                </button>
            </div>

            {showConfirmDialog && (
                <div className="confirmation-dialog-overlay">
                    <div className="confirmation-dialog">
                        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                        <div className="dialog-actions">
                            <button className="confirm-btn" onClick={confirmDelete} disabled={loading}>Có, Xóa</button>
                            <button className="cancel-btn" onClick={cancelDelete} disabled={loading}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList; 