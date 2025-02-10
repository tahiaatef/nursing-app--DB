const AcceptRequest = require('../models/AcceptRequest');

// إنشاء سجل AcceptRequest جديد
exports.createAcceptRequest = async (req, res) => {
  try {
    const acceptRequest = new AcceptRequest(req.body);
    await acceptRequest.save();
    res.status(201).json(acceptRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// جلب كل سجلات AcceptRequest
exports.getAcceptRequests = async (req, res) => {
  try {
    const acceptRequests = await AcceptRequest.find();
    res.json(acceptRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب سجل AcceptRequest حسب الـ id
exports.getAcceptRequestById = async (req, res) => {
  try {
    const acceptRequest = await AcceptRequest.findById(req.params.id);
    if (!acceptRequest) return res.status(404).json({ error: "AcceptRequest not found" });
    res.json(acceptRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تحديث سجل AcceptRequest موجود
exports.updateAcceptRequest = async (req, res) => {
  try {
    const acceptRequest = await AcceptRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!acceptRequest) return res.status(404).json({ error: "AcceptRequest not found" });
    res.json(acceptRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// حذف سجل AcceptRequest
exports.deleteAcceptRequest = async (req, res) => {
  try {
    const acceptRequest = await AcceptRequest.findByIdAndDelete(req.params.id);
    if (!acceptRequest) return res.status(404).json({ error: "AcceptRequest not found" });
    res.json({ message: "AcceptRequest deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
