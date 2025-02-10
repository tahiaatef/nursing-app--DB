const Request = require('../models/requestModel');
const mongoose = require('mongoose');
// إنشاء طلب جديد
exports.createRequest = async (req, res) => {
  try {
    // تحقق مما إذا كان user_id صالحًا قبل تحويله
    if (!mongoose.Types.ObjectId.isValid(req.body.user_id)) {
        return res.status(400).json({ error: "Invalid user_id format" });
    }

    req.body.user_id = new mongoose.Types.ObjectId(req.body.user_id);
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
} catch (error) {
    res.status(400).json({ error: error.message });
}
  
};

// جلب كل الطلبات
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('user_id').populate('reviews');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// جلب طلب معين بالـ ID
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id).populate('user_id').populate('reviews');
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// تحديث طلب معين
exports.updateRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// حذف طلب معين
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
