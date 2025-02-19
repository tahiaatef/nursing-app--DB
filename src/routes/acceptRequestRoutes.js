
const express = require("express");
const router = express.Router();
const { 
  createAcceptRequest, 
  getAcceptRequests, 
  getAcceptRequestById,  
  deleteAcceptRequest ,
  acceptRequest,
  getOffersByNurseId ,
  getAllOffersForRequest
} = require("../controllers/acceptRequestController");

// إنشاء طلب قبول جديد
const  verifyToken  = require("../middlewares/auth");
router.post("/", verifyToken, createAcceptRequest); // ✅ تأكد من استخدام verifyToken



// ✅ اجلب جميع الطلبات
router.get("/", getAcceptRequests);

// ✅ اجلب طلب قبول معين باستخدام `id`
router.get("/:id", getAcceptRequestById);

router.put("/:id/accept", acceptRequest);


// حذف طلب قبول عبر الـ ID
// router.delete("/:id", deleteAcceptRequest);
router.delete("/:request_id", deleteAcceptRequest);


router.get('/nurse/:nurseId', getOffersByNurseId);

router.get("/offers/:request_id", getAllOffersForRequest);


module.exports = router;
