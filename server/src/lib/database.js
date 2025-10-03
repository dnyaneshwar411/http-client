import config from "@/config/config.js";
import mongoose from "mongoose";

mongoose.connect(
  config.mongoose.url
).then(() => {
  console.log('Connected to MongoDB');
});

export default mongoose.connection