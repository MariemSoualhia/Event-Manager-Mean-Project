const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  registerToEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, createEvent);
router.post("/:id/register", protect, registerToEvent);
router.delete("/:id", protect, deleteEvent);
router.put("/:id", protect, updateEvent);

module.exports = router;
