const nodemailer = require("nodemailer");
require("dotenv").config();
const Product = require("../../src/api/v1/models/productModel");
const Event = require("../../src/api/v1/models/eventModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, invoice) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let item;
    let itemType;
    let productOrEventId;

    if (invoice.type === "product") {
      item = await Product.findById(invoice.productId);
      itemType = "Product";
      productOrEventId = invoice.productId;
    } else if (invoice.type === "event") {
      item = await Event.findById(invoice.eventId);
      itemType = "Event";
      productOrEventId = invoice.eventId;
    }

    const emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #f3f3f3; padding: 10px; text-align: center; }
            .content { margin-top: 20px; }
            .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
            .item-image { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Invoice Details</h1>
          </div>
          <div class="content">
            <p>Dear Customer,</p>
            <p>Thank you for your purchase. Here are the details of your invoice:</p>
            <table>
              <tr><td>Invoice Date:  </td><td>${invoice.invoice_date.toDateString()}</td></tr>
              <tr><td>Invoice Amount:  </td><td>$${invoice.invoice_amount.toFixed(
                2
              )}</td></tr>
              <tr><td>Invoice Type:  </td><td>${invoice.type}</td></tr>
              <tr><td>${itemType} ID:  </td><td>${productOrEventId}</td></tr>
              <tr><td>Reference ID:  </td><td>${invoice.refId}</td></tr>
            </table>
          </div>
          <div class="footer">
            <p>Thank you for doing business with us.</p>
          </div>
        </body>
      </html>
    `;

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: `Your invoice for ${invoice.type} has been created.`,
      html: emailBody,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendEventReminder = async (to, eventId) => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    const emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #f3f3f3; padding: 10px; text-align: center; }
            .content { margin-top: 20px; }
            .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Event Reminder</h1>
          </div>
          <div class="content">
            <p>Dear Customer,</p>
            <p>This is a reminder for the upcoming event you are registered for:</p>
            <table>
              <tr><td>Event Name: </td><td>${event.eventName}</td></tr>
              <tr><td>Event Description: </td><td>${
                event.eventDescription
              }</td></tr>
              <tr><td>Event Date: </td><td>${new Date(
                event.eventDate
              ).toDateString()}</td></tr>
              <tr><td>Event Time: </td><td>${event.eventTime}</td></tr>
              <tr><td>Event Location: </td><td>${event.eventLocation}</td></tr>
            </table>
          </div>
          <div class="footer">
            <p>We look forward to seeing you at the event!</p>
          </div>
        </body>
      </html>
    `;

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: `Reminder: Upcoming Event - ${event.eventName}`,
      text: `Reminder: You have an upcoming event - ${event.eventName}`,
      html: emailBody,
    });

    console.log("Event reminder sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending event reminder:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  sendEventReminder,
};
