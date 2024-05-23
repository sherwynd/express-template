const app = require("./app"); // Import the express app
const { connectDatabase } = require("./configs/database");
const { swaggerDocs } = require("./utils/swagger");

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => console.log(`Server has started at ${port}`));
    swaggerDocs(app, port);
  } catch (err) {
    console.log(err);
  }
};

start();
