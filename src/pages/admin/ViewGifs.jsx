import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ImageService from '../../services/image.service';
import './ViewGifs.scss';

const ViewGifs = () => {
  const [selectedFolder, setSelectedFolder] = useState('gifs');
  const [folderImages, setFolderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFolderImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ImageService.getFolderImages(selectedFolder);
      setFolderImages(response.urls || []);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Không thể tải hình ảnh/GIF từ thư mục ' + selectedFolder + '.');
      toast.error('Không thể tải hình ảnh/GIF: ' + (err.response?.data?.message || err.message));
      setFolderImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderImages();
  }, [selectedFolder]);

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder);
  };

  return (
    <div className="view-files-container">
      <h1>Quản lý Tệp</h1>

      <div className="folder-selector">
        <button
          className={selectedFolder === 'gifs' ? 'active' : ''}
          onClick={() => handleFolderChange('gifs')}
        >
          GIFs
        </button>
        <button
          className={selectedFolder === 'images' ? 'active' : ''}
          onClick={() => handleFolderChange('images')}
        >
          Images
        </button>
      </div>

      {loading && <div className="loading-message">Đang tải tệp từ thư mục {selectedFolder}...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && folderImages.length === 0 && (
        <div className="no-files-message">Không có tệp nào trong thư mục {selectedFolder}.</div>
      )}

      {!loading && !error && folderImages.length > 0 && (
        <div className="file-list">
          {folderImages
            .filter(fileUrl => !fileUrl.includes('.emptyFolderPlaceholder'))
            .map((fileUrl, index) => {
              const fileNameWithUUID = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
              const parts = fileNameWithUUID.split('_');
              const originalFileName = parts.length > 1 ? parts.slice(1).join('_') : fileNameWithUUID;

              return (
                <div className="file-item" key={index}>
                  <img src={fileUrl} alt={`file-${index}`} className="file-thumbnail" />
                  <p className="file-name">{originalFileName}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ViewGifs; 