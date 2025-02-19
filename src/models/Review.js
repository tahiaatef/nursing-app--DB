const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request", // ربط الريفيو بالطلب
    required: true,
  },
  nurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse", // ربط الريفيو بالممرض
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
