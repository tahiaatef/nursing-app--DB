
const express = require('express');
const router = express.Router();

const { addReview, getReviewsByRequest, getAllReviews, deleteReview } = require('../controllers/reviewController');

// إضافة تقييم جديد
router.post('/', addReview);

// الحصول على جميع التقييمات لطلب معين
router.get('/:requestId', getReviewsByRequest);
router.get('/', getAllReviews);

// حذف تقييم معين
router.delete('/:reviewId', deleteReview);

module.exports = router;



