import React, { useState, useEffect } from 'react';
import CharmService from '../../services/charm.service'; // Import CharmService
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported if not global
import { toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './manageCharm.scss'; // Assuming a SCSS file for styling

function ManageCharm() {
  const navigate = useNavigate(); // Get the navigate function
  const [charms, setCharms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for search parameters for Charm
  const [searchParams, setSearchParams] = useState({
      minPrice: '',
      maxPrice: '',
      charmCategoryId: '',
      charmName: '',
  });

  // State to explicitly trigger search
  const [triggerSearch, setTriggerSearch] = useState(0);

  // State for pagination and delete confirmation
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State for dialog visibility
   const [charmToDeleteId, setCharmToDeleteId] = useState(null); // State for charm ID to delete

  useEffect(() => {
    const fetchOrSearchCharms = async () => {
      try {
        setLoading(true);
        const isSearchParamsEmpty = Object.values(searchParams).every(param => param === '');
        let response;

        if (isSearchParamsEmpty) {
            // If search params are empty, fetch all charms (with pagination)
             response = await CharmService.getAllCharms({ page: currentPage });
             console.log('Fetch all charms response:', response);
        } else {
             // Otherwise, perform the search (with pagination)
             const activeSearchParams = Object.fromEntries(
                Object.entries(searchParams).filter(([, value]) => value !== '')
            );
            const searchPayload = {
                 ...activeSearchParams,
                 page: currentPage,
            };
             response = await CharmService.searchCharms(searchPayload);
             console.log('Search charms response:', response);
        }

        setCharms(response?.data || []); // Use optional chaining and fallback to empty array
        setTotalPages(response?.totalPages || 1); // Assuming pagination info is in response
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách Charm');
        console.error('Error fetching/searching charms:', err);
        setCharms([]); // Set empty array on error
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchOrSearchCharms();
    // Depend on currentPage and triggerSearch to refetch
  }, [currentPage, triggerSearch]);

  // Handle input changes for search parameters - Does NOT trigger search
  const handleSearchInputChange = (e) => {
      const { name, value } = e.target;
      setSearchParams(prevParams => ({
          ...prevParams,
          [name]: value,
      }));
  };

   // Handle explicit search button click
  const handleSearchClick = () => {
      setCurrentPage(1); // Reset to page 1 for new search
      setTriggerSearch(prev => prev + 1); // Increment to trigger useEffect
  };

    // Handle pagination changes - will be handled by useEffect dependency on currentPage
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle delete charm button click
    const handleDelete = (id) => {
        setCharmToDeleteId(id);
        setShowConfirmDialog(true);
    };

    // Confirm deletion
    const confirmDelete = async () => {
        try {
            setLoading(true); // Optional: Show loading during deletion
            await CharmService.deleteCharm(charmToDeleteId);
            toast.success('Xóa Charm thành công!'); // Success notification
            // Re-fetch the current list based on current search/pagination
            const isSearchParamsEmpty = Object.values(searchParams).every(param => param === '');
            if (isSearchParamsEmpty) {
                 CharmService.getAllCharms({ page: currentPage }); // Re-fetch all
            } else {
                 CharmService.searchCharms({...searchParams, page: currentPage}); // Re-search with current params
            }
        } catch (err) {
            console.error('Error deleting charm:', err);
            setError('Không thể xóa Charm'); // Update error state
            toast.error('Không thể xóa Charm.'); // Error notification
        } finally {
            setLoading(false); // Optional: Hide loading
            // Hide dialog and reset state
            setShowConfirmDialog(false);
            setCharmToDeleteId(null);
        }
    };

    // Cancel deletion
    const cancelDelete = () => {
        setShowConfirmDialog(false);
        setCharmToDeleteId(null);
    };


  if (loading) return <div className="loading">Đang tải danh sách Charm...</div>;
   // Only show error if no data is loaded
  if (error && charms.length === 0) return <div className="error">{error}</div>;

  return (
    <div className="manage-charm-container">
      <h1>Danh sách Charm</h1>

      {/* Search and Add Button Section */}
      <div className="manage-charm__header">
           <div className="manage-charm__search">
                <div className="search-row">
                    <input
                        type="text"
                        name="charmName"
                        placeholder="Tìm kiếm tên Charm..."
                        value={searchParams.charmName}
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
                        name="charmCategoryId"
                        placeholder="Mã danh mục Charm..."
                        value={searchParams.charmCategoryId}
                        onChange={handleSearchInputChange}
                    />
                </div>
           </div>

           {/* Search Button */}
           <button className="search-button" onClick={handleSearchClick} disabled={loading}>
               Tìm kiếm
           </button>

           {/* Add Charm Button - Implement navigation */}
           <button className="add-charm-button" onClick={() => navigate('/admin/add-charm')}>Thêm Charm mới</button>
      </div>

      {/* Basic Table to display charms - Customize as needed */}
      <table className="charm-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Charm</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            {/* Add other relevant columns based on Charm data structure */}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {charms.map(charm => (
            <tr key={charm.id}>
              <td>{charm.id}</td><td>{charm.charmName}</td><td>{charm.price?.toLocaleString('vi-VN')}đ</td><td>
                <span className={`status ${charm.isActive ? 'active' : 'inactive'}`}>
                  {charm.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view-details" onClick={() => navigate(`/admin/charm-detail/${charm.id}`)}>Xem chi tiết</button>
                  <button className="action-btn edit" onClick={() => navigate(`/admin/edit-charm/${charm.id}`)}>Sửa</button>
                  <button className="action-btn delete" onClick={() => handleDelete(charm.id)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
           {/* Show message if no charms found and not loading/erroring */}
           {!loading && !error && charms.length === 0 && (
              <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>Không tìm thấy Charm nào phù hợp.</td> {/* Adjust colspan based on number of columns */}
              </tr>
           )}
        </tbody>
      </table>

      {/* Pagination */}
       <div className="charm-list__pagination"> {/* Assuming pagination class structure */} 
           <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1 || loading}
           >
               Trước
           </button>
           <span>Trang {currentPage} / {totalPages}</span>
           <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages || loading}
           >
               Sau
           </button>
       </div>

       {/* Custom Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="confirmation-dialog-overlay">
                    <div className="confirmation-dialog">
                        <p>Bạn có chắc chắn muốn xóa Charm này?</p>
                        <div className="dialog-actions">
                            <button className="confirm-btn" onClick={confirmDelete} disabled={loading}>Có, Xóa</button>
                            <button className="cancel-btn" onClick={cancelDelete} disabled={loading}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}

    </div>
  );
}

export default ManageCharm; 