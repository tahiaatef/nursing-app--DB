const express = require("express");
const router = express.Router();
const { 
  createAcceptRequest, 
  getAcceptRequests, 
  getAcceptRequestById, 
  updateAcceptRequest, 
  deleteAcceptRequest 
} = require("../controllers/acceptRequestController");

// إنشاء سجل AcceptRequest جديد
router.post("/", createAcceptRequest);

// جلب كل سجلات AcceptRequest
router.get("/", getAcceptRequests);

// جلب سجل AcceptRequest معين باستخدام الـ id
router.get("/:id", getAcceptRequestById);

// تحديث سجل AcceptRequest باستخدام الـ id
router.put("/:id", updateAcceptRequest);

// حذف سجل AcceptRequest باستخدام الـ id
router.delete("/:id", deleteAcceptRequest);

module.exports = router;
