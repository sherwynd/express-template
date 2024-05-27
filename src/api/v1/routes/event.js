const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
