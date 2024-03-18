const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("Database environment does not exist in .env");
      process.exit(1);
    }
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      `Connected to Database to ${connection.connection._connectionString}`
    );
  } catch (err) {
    console.error("MongoDB Connection Error", err.message);
  }
};

module.exports = {
  connectDatabase,
};
