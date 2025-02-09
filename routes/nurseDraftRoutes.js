const express = require('express');
const router = express.Router();
const nurseDraftController = require('../controllers/nurseDraftController');

// إنشاء مسودة ممرضة جديدة
router.post('/', nurseDraftController.createNurseDraft);

// جلب كل مسودات الممرضين
router.get('/', nurseDraftController.getAllNurseDrafts);

// جلب مسودة ممرضة معينة بواسطة الـ ID
router.get('/:id', nurseDraftController.getNurseDraftById);

// تحديث مسودة ممرضة معينة
router.put('/:id', nurseDraftController.updateNurseDraft);

// حذف مسودة ممرضة معينة
router.delete('/:id', nurseDraftController.deleteNurseDraft);

module.exports = router;
