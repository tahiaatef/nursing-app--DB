/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the subcategory
 *         name:
 *           type: string
 *           description: The name of the subcategory
 *         categoryId:
 *           type: string
 *           description: The id of the parent category
 *       example:
 *         _id: "60c72b2f4f1a2b001c8d4567"
 *         name: "SubCategory Example"
 *         categoryId: "60c72b2f4f1a2b001c8d4568"
 */

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: API for managing subcategories
 */

const express = require('express');
const router = express.Router();
const { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } = require('../controllers/subCategoryController');

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad Request
 */
router.post('/', createSubCategory);

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Retrieve a list of subcategories
 *     tags: [SubCategory]
 *     responses:
 *       200:
 *         description: A list of subcategories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */
router.get('/', getSubCategories);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update an existing subcategory
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subcategory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: The updated subcategory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Subcategory not found
 */
router.put('/:id', updateSubCategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Delete a subcategory by id
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory id
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 */
router.delete('/:id', deleteSubCategory);

module.exports = router;
