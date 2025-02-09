const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    color: { type: String } // hex_decimal
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
