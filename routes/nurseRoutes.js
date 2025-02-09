const express = require('express');
const { createNurse, updateNurse, deleteNurse } = require('../controllers/nurseController');
const router = express.Router();

router.post('/', createNurse);
router.put('/:id', updateNurse);
router.delete('/:id', deleteNurse);

module.exports = router;
