const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const eventService = require("../services/eventService");

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
    console.log(`Received ID: ${id}`);

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
    const event = await eventService.createEvent(req.body);
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

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
