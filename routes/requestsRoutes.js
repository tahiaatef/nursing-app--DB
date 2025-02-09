const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// إضافة طلب جديد
router.post('/', requestController.createRequest);

// الحصول على جميع الطلبات
router.get('/', requestController.getAllRequests);

// الحصول على طلب معين حسب الـ ID
router.get('/:id', requestController.getRequestById);

// تحديث طلب معين
router.put('/:id', requestController.updateRequest);

// حذف طلب معين
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
