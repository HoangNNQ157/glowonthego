import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharmService from '../../services/charm.service';
import { toast } from 'react-toastify';
import './editCharm.scss'; // Assuming a SCSS file for styling

const EditCharm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State for charm data
    const [charm, setCharm] = useState({
        charmName: '',
        price: '',
        description: '',
        charmCategoryId: '',
        color: '',
        size: '',
        quantity: '',
        image: '',
        isActive: true,
        isCustomizable: false,
        isQRFromGif: false,
        qrMessage: '',
        qrImage: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharm = async () => {
            try {
                setLoading(true);
                const data = await CharmService.getCharmById(id);
                console.log('Fetched charm data:', data); // Debug log
                if (data) {
                    setCharm({
                        ...data.data,
                        price: data.data.price?.toString() || '',
                        quantity: data.data.quantity?.toString() || '',
                        charmCategoryId: data.data.charmCategoryId?.toString() || ''
                    });
                }
                setError(null);
            } catch (err) {
                setError('Không thể tải thông tin Charm');
                console.error('Error fetching charm:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharm();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCharm(prevCharm => ({
            ...prevCharm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!charm) return;

        setLoading(true);
        try {
            const dataToSend = {
                ...charm,
                price: parseFloat(charm.price),
                charmCategoryId: parseInt(charm.charmCategoryId),
                quantity: parseInt(charm.quantity)
            };

            await CharmService.updateCharm(id, dataToSend);
            toast.success('Cập nhật Charm thành công!');
            navigate('/admin/manage-charm');
        } catch (err) {
            setError('Không thể cập nhật Charm');
            console.error('Error updating charm:', err);
            toast.error('Không thể cập nhật Charm.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !charm.charmName) return <div className="loading">Đang tải thông tin Charm...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="edit-charm-container">
            <h1>Chỉnh sửa Charm: {charm.charmName}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="charmName">Tên Charm:</label>
                    <input 
                        type="text" 
                        id="charmName" 
                        name="charmName"
                        value={charm.charmName}
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
                        value={charm.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Mô tả:</label>
                    <textarea 
                        id="description" 
                        name="description"
                        value={charm.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="charmCategoryId">Mã danh mục Charm:</label>
                    <input 
                        type="number" 
                        id="charmCategoryId" 
                        name="charmCategoryId"
                        value={charm.charmCategoryId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Số lượng:</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        name="quantity"
                        value={charm.quantity}
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
                        value={charm.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="isActive">Kích hoạt:</label>
                    <input 
                        type="checkbox" 
                        id="isActive" 
                        name="isActive"
                        checked={charm.isActive}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="isCustomizable">Tùy chỉnh được:</label>
                    <input 
                        type="checkbox" 
                        id="isCustomizable" 
                        name="isCustomizable"
                        checked={charm.isCustomizable}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="isQRFromGif">QR từ GIF:</label>
                    <input 
                        type="checkbox" 
                        id="isQRFromGif" 
                        name="isQRFromGif"
                        checked={charm.isQRFromGif}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="qrMessage">Tin nhắn QR:</label>
                    <textarea 
                        id="qrMessage" 
                        name="qrMessage"
                        value={charm.qrMessage}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Đang cập nhật...' : 'Cập nhật Charm'}
                </button>
            </form>
        </div>
    );
};

export default EditCharm; 