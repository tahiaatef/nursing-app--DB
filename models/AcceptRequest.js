const mongoose = require("mongoose");

const acceptRequestSchema = new mongoose.Schema({
  nurse_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // الممرض اللي وافق على الطلب
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true }, // الطلب اللي الممرض وافق عليه
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  }, // حالة الطلب من قبل الممرض
  accepted_at: { type: Date, default: Date.now }, // وقت الموافقة
});

module.exports = mongoose.model("AcceptRequest", acceptRequestSchema);

