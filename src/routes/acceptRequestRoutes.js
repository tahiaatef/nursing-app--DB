/**
 * @swagger
 * components:
 *   schemas:
 *     AcceptRequest:
 *       type: object
 *       required:
 *         - request_id
 *         - nurse_id
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the accept request
 *         request_id:
 *           type: string
 *           description: The id of the request
 *         nurse_id:
 *           type: string
 *           description: The id of the nurse accepting the request
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *           description: The status of the accept request
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation time of the record
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update time of the record
 *       example:
 *         _id: "60d0fe4f5311236168a109cb"
 *         request_id: "60d0fe4f5311236168a109cc"
 *         nurse_id: "60d0fe4f5311236168a109cd"
 *         status: "pending"
 */

/**
 * @swagger
 * tags:
 *   name: AcceptRequests
 *   description: API for managing accept requests
 */

const express = require("express");
const router = express.Router();
const { 
  createAcceptRequest, 
  getAcceptRequests, 
  getAcceptRequestById, 
  updateAcceptRequest, 
  deleteAcceptRequest 
} = require("../controllers/acceptRequestController");

/**
 * @swagger
 * /api/acceptrequests:
 *   post:
 *     summary: Create a new accept request
 *     tags: [AcceptRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptRequest'
 *     responses:
 *       201:
 *         description: Accept request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcceptRequest'
 *       400:
 *         description: Bad Request
 */
router.post("/", createAcceptRequest);

/**
 * @swagger
 * /api/acceptrequests:
 *   get:
 *     summary: Get all accept requests
 *     tags: [AcceptRequests]
 *     responses:
 *       200:
 *         description: A list of accept requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AcceptRequest'
 *       500:
 *         description: Server Error
 */
router.get("/", getAcceptRequests);

/**
 * @swagger
 * /api/acceptrequests/{id}:
 *   get:
 *     summary: Get an accept request by ID
 *     tags: [AcceptRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The accept request id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Accept request found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcceptRequest'
 *       404:
 *         description: Accept request not found
 */
router.get("/:id", getAcceptRequestById);

/**
 * @swagger
 * /api/acceptrequests/{id}:
 *   put:
 *     summary: Update an accept request by ID
 *     tags: [AcceptRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The accept request id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptRequest'
 *     responses:
 *       200:
 *         description: Accept request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcceptRequest'
 *       404:
 *         description: Accept request not found
 */
router.put("/:id", updateAcceptRequest);

/**
 * @swagger
 * /api/acceptrequests/{id}:
 *   delete:
 *     summary: Delete an accept request by ID
 *     tags: [AcceptRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The accept request id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Accept request deleted successfully
 *       404:
 *         description: Accept request not found
 */
router.delete("/:id", deleteAcceptRequest);

module.exports = router;
