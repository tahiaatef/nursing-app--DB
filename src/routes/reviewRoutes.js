const express = require('express');
const router = express.Router();
const { addReview, getReviewsByRequest, getAllReviews, deleteReview } = require('../controllers/reviewController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - nurse_id
 *         - patient_id
 *         - request_id
 *         - rating
 *         - comment
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the review
 *         nurse_id:
 *           type: string
 *           description: The id of the nurse (or user) giving the review
 *         patient_id:
 *           type: string
 *           description: The id of the patient associated with the review
 *         request_id:
 *           type: string
 *           description: The id of the request related to the review
 *         rating:
 *           type: number
 *           description: The rating given (e.g., 1 to 5)
 *         comment:
 *           type: string
 *           description: The review comment
 *       example:
 *         nurse_id: "65f1a2b3-c4d5-e6f7-8901-23456789abcd"
 *         patient_id: "65f1a2b3-c4d5-e6f7-8901-23456789abce"
 *         request_id: "65f1a2b3-c4d5-e6f7-8901-23456789abcf"
 *         rating: 5
 *         comment: "Excellent service!"
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 */
router.post('/', addReview);

/**
 * @swagger
 * /api/reviews/{requestId}:
 *   get:
 *     summary: Get reviews by request ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to get reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the given request ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews not found
 */
router.get('/:requestId', getReviewsByRequest);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', getAllReviews);

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/:reviewId', deleteReview);

module.exports = router;



