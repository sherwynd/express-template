const Event = require("../models/eventModel");

const getAllEvents = async () => {
  return await Event.find();
};

const getEventById = async (id) => {
  return await Event.findById(id);
};

const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
};
