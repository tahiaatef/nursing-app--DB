const SubCategory = require('../models/Sub-Categories');

// إنشاء فئة فرعية جديدة
const createSubCategory = async (req, res) => {
    try {
        const newSubCategory = new SubCategory(req.body);
        await newSubCategory.save();
        res.status(201).json(newSubCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// جلب جميع الفئات الفرعية مع الفئات المرتبطة بها
const getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category_id');
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// تحديث فئة فرعية
const updateSubCategory = async (req, res) => {
  try {
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedSubCategory) return res.status(404).json({ error: "SubCategory not found" });
      res.json(updatedSubCategory);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// حذف فئة فرعية
const deleteSubCategory = async (req, res) => {
  try {
      const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
      if (!deletedSubCategory) return res.status(404).json({ error: "SubCategory not found" });
      res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory };
