const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    color: { type: String }, // hex_decimal
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

module.exports = mongoose.model('SubCategory', subCategorySchema);
