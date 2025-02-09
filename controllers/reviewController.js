const Review = require('../models/Review');

// إضافة تقييم جديد
const addReview = async (req, res) => {
    
    try {
      const { nurse_id, patient_id, request_id, rating, comment } = req.body;

      if (!nurse_id || !patient_id || !request_id || !rating || !comment) {
          return res.status(400).json({ error: "All fields are required!" });
      }

      const review = new Review({ nurse_id, patient_id, request_id, rating, comment });
      await review.save();
      
      res.status(201).json({ message: "Review added successfully!", review });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// جلب كل التقييمات لطلب معين
const getReviewsByRequest = async (req, res) => {
    try {
        const { request_id } = req.params;
        const reviews = await Review.find({ request_id })
        .populate('nurse_id', 'user_name') 
        .populate('patient_id', 'user_name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// جلب جميع التقييمات
const getAllReviews = async (req, res) => {
  try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addReview, getReviewsByRequest, getAllReviews, deleteReview };