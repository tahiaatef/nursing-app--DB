const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // المريض اللي كتب التقييم
  nurse_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // الممرض اللي اتقيم
  rating: { type: Number, min: 1, max: 5, required: true }, // التقييم من 1 لـ 5 نجوم
  comment: { type: String, required: true }, // تعليق المريض
  created_at: { type: Date, default: Date.now }, // تاريخ كتابة التقييم
});

module.exports = mongoose.model("Review", reviewSchema);
