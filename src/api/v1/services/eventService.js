const { formatDate, formatTime } = require("../../../utils/formatDateTime");
const Event = require("../models/eventModel");

const getAllEvents = async () => {
  const events = await Event.find();

  const formattedEvents = events.map((event) => ({
    ...event.toObject(),
    eventDate: formatDate(event.eventDate),
    eventTime: formatTime(event.eventTime),
  }));

  return formattedEvents;
};

const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new Error("Event not found");
  }

  const formattedEvent = {
    ...event.toObject(),
    eventDate: formatDate(event.eventDate),
    eventTime: formatTime(event.eventTime),
  };

  return formattedEvent;
};

const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Event not found" });
    }

    const updatedEvent = await eventService.updateEvent(id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Event not found" });
    }

    const deletedEvent = await eventService.deleteEvent(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventsByUser = async (refId) => {
  const events = await Event.find({ createdBy: refId });
  return events.map((event) => ({
    ...event.toObject(),
    eventDate: formatDate(event.eventDate),
    eventTime: formatTime(event.eventTime),
  }));
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUser,
};
