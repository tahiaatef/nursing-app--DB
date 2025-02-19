const express = require("express");
const Review = require("../models/Review");
const Request = require("../models/requestModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { requestId,  nurseId, rating, comment } = req.body;

    // التحقق من أن الطلب موجود وأنه مكتمل
    const request = await Request.findById(requestId);
    console.log("Request Found:", request);
    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }
    
    // const nurseExists = await nurse.findById(nurseId);
    // if (!nurseExists) {
    //   return res.status(400).json({ message: "Nurse not found" });
    // }

    const newReview = new Review({ requestId, nurseId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});


router.get("/nurse/:nurseId", async (req, res) => {
  try {
    const { nurseId } = req.params;
    
    console.log("Fetching reviews for nurse:", nurseId); // طباعة الـ nurseId للتحقق
    
    const reviews = await Review.find({ nurseId })
    
    console.log("Fetched reviews:", reviews); // طباعة التقييمات المسترجعة
    
    if (!reviews || reviews.length === 0) {
      return res.json({ message: "No reviews found for this nurse" });
    }
  //   if (!reviews.length) {
  //     return res.json({ message: "No reviews found for this nurse", reviews: [] });
  // }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error); // طباعة الخطأ في السيرفر
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
});



module.exports = router;

