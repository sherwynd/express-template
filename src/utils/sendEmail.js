const nodemailer = require("nodemailer");
require("dotenv").config();

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
            <h1>Invoice Details</h1>
          </div>
          <div class="content">
            <p>Dear Customer,</p>
            <p>Thank you for your purchase. Here are the details of your invoice:</p>
            <table>
              <tr><td>Invoice Date:</td><td>${invoice.invoice_date.toDateString()}</td></tr>
              <tr><td>Invoice Amount:</td><td>$${invoice.invoice_amount.toFixed(
                2
              )}</td></tr>
              <tr><td>Invoice Type:</td><td>${invoice.type}</td></tr>
              <tr><td>Product ID:</td><td>${invoice.product_id}</td></tr>
              <tr><td>Reference ID:</td><td>${invoice.refId}</td></tr>
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

module.exports = sendEmail;
