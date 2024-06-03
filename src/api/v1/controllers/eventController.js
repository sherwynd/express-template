const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const eventService = require("../services/eventService");
const User = require("../models/auth/userModel");

// GET all products
const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single product by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(`Received ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId");

      res.status(404).json({ error: "Test Event not found" });
    }

    const event = await eventService.getEventById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new product
const createEvent = async (req, res) => {
  try {
    // console.log("Request Object:", req.body);

    const event = await eventService.createEvent({
      ...req.body,
      createdBy: req.body.createdBy,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE an existing product
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: `Event not found` });
  }

  const event = await Event.findOneAndDelete({ _id: id });
  if (!event) {
    res.status(400).json({ error: `Event not found` });
  }

  res.status(200).json(event);
};

// UPDATE an existing product
const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: `Event not found` });
  }
  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!event) {
    res.status(400).json({ error: `event not found` });
  }
  res.status(200).json(event);
};

// Subscribe to Event Endpoint
const subscribeToEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID
    const { refId } = req.body; // User refId

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const user = await User.findOne({ refId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user to event subscribers if not already subscribed
    if (!event.subscribers.includes(refId)) {
      event.subscribers.push(refId);
    }

    // Add event to user's subscriptions if not already subscribed
    if (!user.eventSubscriptions.includes(id)) {
      user.eventSubscriptions.push(id);
    }

    await event.save();
    await user.save();

    res.status(200).json({ event, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get event subscribers
const getEventSubscribers = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const subscribers = await User.find({ refId: { $in: event.subscribers } });

    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET events by user
const getEventsByUser = async (req, res) => {
  try {
    const { refId } = req.params;
    const events = await eventService.getEventsByUser(refId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  subscribeToEvent,
  getEventSubscribers,
  getEventsByUser,
};
