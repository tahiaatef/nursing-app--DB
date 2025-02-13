const Request = require('../models/requestModel');
const mongoose = require('mongoose');
// exports.createRequest = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body); // ✅ فحص البيانات المستلمة

//     if (!req.body.user_id) {
//       return res.status(400).json({ error: "user_id is required" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(req.body.user_id)) {
//       return res.status(400).json({ error: "Invalid user_id format" });
//     }

//     req.body.user_id = new mongoose.Types.ObjectId(req.body.user_id);
//     const request = new Request(req.body);
//     await request.save();
//     res.status(201).json(request);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// جلب كل الطلبات

// exports.createRequest = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body); 

//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ error: "Request body is empty" });
//     }

//     if (!req.body.user_id) {
//       return res.status(400).json({ error: "user_id is required" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(req.body.user_id)) {
//       return res.status(400).json({ error: "Invalid user_id format" });
//     }

//     const newRequest = new Request({
//       user_id: new mongoose.Types.ObjectId(req.body.user_id),
//       description: req.body.description,
//       images: req.body.images || [],
//       reviews: [],
//       interested: [],
//       offers: []
//     });

//     const savedRequest = await newRequest.save();
//     res.status(201).json(savedRequest);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createRequest = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    if (!req.body.user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.user_id)) {
      return res.status(400).json({ error: "Invalid user_id format" });
    }

    // ✅ تأكدي من أن `user_id` يتم تخزينه بشكل صحيح
    const newRequest = new Request({
      user_id: req.body.user_id, // ✅ بدون تحويله إلى ObjectId يدويًا
      description: req.body.description,
      images: req.body.images || [],
      reviews: [],
      interested: [],
      offers: []
    });

    console.log("New Request Before Save:", newRequest); // ✅ طباعة البيانات قبل الحفظ

    const savedRequest = await newRequest.save();
    console.log("Saved Request:", savedRequest); // ✅ طباعة البيانات بعد الحفظ
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // exports.getAllRequests = async (req, res) => {
// //     try {
// //         const requests = await Request.find().populate('user_id').populate('reviews');
// //         res.status(200).json(requests);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };

// // جلب طلب معين بالـ ID
// exports.getAllRequests = async (req, res) => {
//   try {
//       const requests = await Request.find()
//           .populate({ path: 'user_id', model: 'User' }) // تأكدي أن الاسم مطابق للـ model
//           .populate('reviews')
//           .exec();
      
//       res.status(200).json(requests);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };


exports.getAllRequests = async (req, res) => {
  try {
      const requests = await Request.find(); // 
      console.log(requests); // شوفي البيانات اللي بترجع
      res.status(200).json(requests);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

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
