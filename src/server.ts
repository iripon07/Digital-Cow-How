import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const port = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🍔 Database is connected successfully!`);
    app.listen(port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database`, error);
  }
}

main();
