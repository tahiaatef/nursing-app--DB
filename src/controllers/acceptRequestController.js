
const AcceptRequest = require('../models/AcceptRequest');
const Request = require('../models/requestModel');
const User = require('../models/User');

// هنعمل طلب من الممرض
// const createAcceptRequest = async (req, res) => {
//   try {
//     const { request_id, price, message } = req.body;
//     console.log("Price:", price);
//     console.log("Message:", message);
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: "Unauthorized: Nurse ID is missing" });
//     }
//     const nurse_id = req.user.id;

//     const existingRequest = await Request.findById(request_id);
//     if (!existingRequest) {
//       return res.status(404).json({ error: "Request not found" });
//     }

//     const existingAcceptRequest = await AcceptRequest.findOne({ nurse_id, request_id });
//     if (existingAcceptRequest) {
//       return res.status(400).json({ error: "You have already accepted this request" });
//     }

//     const newAcceptRequest = new AcceptRequest({ nurse_id, request_id, price, message });
//     await newAcceptRequest.save();

//     res.status(201).json(newAcceptRequest);
//   } catch (error) {
//     console.error("Error in createAcceptRequest:", error);
//     res.status(500).json({ error: error.message || "Internal server error" });
//   }
// };
const createAcceptRequest = async (req, res) => {
  try {
    const { request_id, price, message } = req.body;

    // التحقق من أن الطلب يحتوي على الحقول المطلوبة
    if (!request_id || price === undefined || !message) {
      return res.status(400).json({ error: "Missing required fields: request_id, price, or message" });
    }

    // التحقق من أن السعر هو عدد صحيح أكبر من 0
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    console.log("Price:", price);
    console.log("Message:", message);

    // التحقق من أن المستخدم مسجل الدخول ولديه معرّف
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Nurse ID is missing" });
    }
    const nurse_id = req.user.id;

    // التحقق من وجود الطلب في قاعدة البيانات
    const existingRequest = await Request.findById(request_id);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // التحقق من أنه لا يوجد طلب سابق من نفس الممرض
    const existingAcceptRequest = await AcceptRequest.findOne({ nurse_id, request_id });
    if (existingAcceptRequest) {
      return res.status(400).json({ error: "You have already accepted this request" });
    }

    // إنشاء وتخزين الطلب الجديد
    const newAcceptRequest = new AcceptRequest({ nurse_id, request_id, price, message });
    await newAcceptRequest.save();

    console.log("New AcceptRequest:", newAcceptRequest);

    // الرد على العميل بالعروض المقبولة
    res.status(201).json(newAcceptRequest);
  } catch (error) {
    console.error("Error in createAcceptRequest:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


// هنجيب الطلبات اللي تم قبولها من الممرضين

const getAcceptRequests = async (req, res) => {
  try {
    const acceptedRequests = await AcceptRequest.find({
      status: { $in: ["accepted", "in-progress"] }
    })
      .populate("request_id") // لجلب بيانات الطلب
      .populate("nurse_id", "name email"); // لجلب بيانات الممرض


    res.status(200).json(acceptedRequests);
  } catch (error) {
    console.error("Error in getAcceptRequests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};















const getAcceptRequestById = async (req, res) => {
  try {
    console.log("Fetching request with ID:", req.params.id); // ✅ تحقق من القيم المرسلة

    const acceptRequest = await AcceptRequest.findById(req.params.id)
      .populate("request_id")
      .populate("nurse_id", "name email");

    if (!acceptRequest) {
      return res.status(404).json({ error: "Accept request not found" });
    }

    res.status(200).json(acceptRequest);
  } catch (error) {
    console.error("Error in getAcceptRequestById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteAcceptRequest = async (req, res) => {
  try {
      const { request_id } = req.params;  // 🔹 تحقق من استقبال ID من الـ params

      if (!request_id) {
          return res.status(400).json({ message: "request_id is required" });
      }

      const deletedRequest = await AcceptRequest.findOneAndDelete({ _id: request_id });

      if (!deletedRequest) {
          return res.status(404).json({ message: "Request not found" });
      }

      res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params; // جلب الـ ID من الطلب
    const updatedRequest = await AcceptRequest.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true } // حتى يرجع لنا الطلب بعد التعديل
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error in acceptRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getOffersByNurseId = async (req, res) => {
  try {
    const offers = await AcceptRequest.find({ nurse_id: req.params.nurseId })
      .populate("request_id") // يجلب بيانات الطلب المرتبط بالعرض
      .populate("nurse_id", "first_name last_name email"); // يجلب بيانات الممرض

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllOffersForRequest = async (req, res) => {
  const { request_id } = req.params; // تأكد من استخدام الاسم الصحيح في params
  console.log("Request ID received:", request_id); // سجل الـ requestId للتأكد من وصوله
  try {
    const offers = await AcceptRequest.find({ request_id }).populate("nurse_id", "first_name last_name");
    if (!offers || offers.length === 0) {
      return res.status(404).send("لا توجد عروض لهذا الطلب.");
    }

    const offersWithDetails = offers.map(offer => ({
      _id: offer._id,
      nurse: offer.nurse_id,
      price: offer.price,
      message: offer.message
    }));

    res.status(200).send(offersWithDetails);
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).send("حدث خطأ أثناء جلب العروض.");
  }
};













module.exports = {
  createAcceptRequest,
  getAcceptRequests,
  getAcceptRequestById,
  deleteAcceptRequest,
  acceptRequest,
  getOffersByNurseId,
  getAllOffersForRequest, // ✅ إضافة الدالة الجديدة
};
