const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  registerToEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, createEvent);
router.post("/:id/register", protect, registerToEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
