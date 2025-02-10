
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [String],
    title: String,
    description: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: Object,
    status: { type: String, enum: ['valid', 'expired', 'in_progress', 'pending', 'completed'] },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    offers: []
}, { timestamps: true });

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;  // ✅ تصدير Request
