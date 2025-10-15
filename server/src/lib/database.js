import mongoose from "mongoose";
import config from "@/config/config.js";

const MONGODB_URI = config.mongoose.url;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false, // important to avoid query buffering
      })
      .then((mongooseInstance) => {
        compileSchemas();
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

function compileSchemas() {
  import("@/database/models/collection")
  import("@/database/models/node")
  import("@/database/models/request")
  import("@/database/models/user")
  import("@/database/models/workspace")
}


export default dbConnect;