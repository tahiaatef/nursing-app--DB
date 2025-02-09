const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route لتسجيل مستخدم جديد (Register)
router.post('/register', userController.registerUser);

// Route لتسجيل الدخول (Login)
router.post('/login', userController.loginUser);

// Route لجلب كل المستخدمين
router.get('/', userController.getAllUsers);

// Route لتحديث بيانات مستخدم معين
router.put('/:id', userController.updateUser);

// Route لحذف مستخدم معين
router.delete('/:id', userController.deleteUser);

module.exports = router;
