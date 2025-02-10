
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Route لتسجيل مستخدم جديد (Register)
router.post('/register', userController.registerUser);

// Route لتسجيل الدخول (Login)
router.post('/login', userController.loginUser);

// Route لجلب كل المستخدمين (يمكن حمايته إذا أردتِ)
// router.get('/', auth, userController.getAllUsers);
router.get('/', userController.getAllUsers);
// جلب مستخدم محدد بواسطة الـ ID
router.get('/:id', userController.getUserById);


// حماية تحديث بيانات المستخدم باستخدام الـ auth middleware
router.put('/:id', auth, userController.updateUser);

// حماية حذف المستخدم باستخدام الـ auth middleware
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
