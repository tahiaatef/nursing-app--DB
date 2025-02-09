const Category = require('../models/Categories');

// إنشاء فئة جديدة
const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// جلب جميع الفئات
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// تحديث فئة موجودة
const updateCategory = async (req, res) => {
  try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCategory) return res.status(404).json({ error: "Category not found" });
      res.json(updatedCategory);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// حذف فئة
const deleteCategory = async (req, res) => {
  try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };


