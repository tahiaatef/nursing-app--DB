const mongoose = require("mongoose");

const acceptRequestSchema = new mongoose.Schema({
  nurse_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true }, 
  price: { type: Number, required: true },  // ✅ إضافة السعر
  message: { type: String, required: true }, // ✅ إضافة الرسالة
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  }, 
  accepted_at: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("AcceptRequest", acceptRequestSchema);

