import { useState } from 'react';
import { toast } from 'react-toastify';
import ReviewService from '../services/review.service';
import './ReviewModal.scss'; // We'll create this SCSS file later

const StarRating = ({ rating, onRatingChange, editable = false }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={'star ' + (i <= rating ? 'filled' : '')}
        onClick={() => editable && onRatingChange(i)}
        style={{ cursor: editable ? 'pointer' : 'default' }}
      >
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const ReviewModal = ({ isOpen, onClose, product, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá.');
      setIsSubmitting(false);
      return;
    }

    if (comment.trim() === '') {
      toast.error('Vui lòng nhập bình luận.');
      setIsSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        productId: product.productId,
        isCharm: product.productType === 2, // Assuming 1 for Bracelet, 2 for Charm
        rating: rating,
        comment: comment,
      };
      await ReviewService.createReview(reviewData);
      toast.success('Đánh giá của bạn đã được gửi!');
      onReviewSubmit(); // Notify parent component (Account.jsx)
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Gửi đánh giá thất bại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-modal__overlay" onClick={onClose}>
      <div className="review-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal__header">
          <h2>Đánh giá sản phẩm</h2>
          <button className="review-modal__close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="review-modal__product-info">
          <p>Đánh giá cho: **{product.productType === 1 ? 'Bracelet' : 'Charm'} ID: {product.productId}**</p>
        </div>
        <form onSubmit={handleSubmit} className="review-modal__form">
          <div className="form-group">
            <label>Đánh giá của bạn:</label>
            <StarRating rating={rating} onRatingChange={handleRatingChange} editable={true} />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Bình luận:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              rows="4"
              className="form-textarea"
            ></textarea>
          </div>
          <div className="review-modal__actions">
            <button type="submit" disabled={isSubmitting} className="submit-review-btn">
              {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
            <button type="button" onClick={onClose} className="cancel-review-btn">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 