const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  subscribeToEvent,
  getEventSubscribers,
  getEventsByUser,
} = require("../controllers/eventController");
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/subscribe", subscribeToEvent);
router.get("/:id/subscribers", getEventSubscribers);
router.get("/user/:refId", getEventsByUser);

module.exports = router;
