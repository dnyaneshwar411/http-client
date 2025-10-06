// seed/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Workspace from "../src/database/models/workspace.js";
import Collection from "../src/database/models/collection.js";
import Node from "../src/database/models/node.js";
import Request from "../src/database/models/request.js";

dotenv.config();

// ---- CONFIG ----
const MONGO_URI = process.env.DATABASE;
const WORKSPACES_TO_CREATE = 2;
const COLLECTIONS_PER_WORKSPACE = [7, 10];
const REQUESTS_PER_COLLECTION = [60, 70];
console.log(MONGO_URI)
// ---- HELPERS ----
function randomBetween([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createRequestDoc(collectionId) {
  return Request.create({
    name: faker.hacker.phrase(),
    method: faker.helpers.arrayElement(["GET", "POST", "PUT", "DELETE"]),
    url: faker.internet.url(),
    headers: [
      { name: "Content-Type", value: "application/json" },
      { name: "Accept", value: "application/json" },
    ],
    params: [{ name: "id", value: faker.string.uuid() }],
    body: {
      selected: "raw",
      json: { sample: faker.lorem.sentence() },
    },
    collectionId,
  });
}

// Recursive folder builder
async function createFolderTree(collectionId, parent = null, depth = 0, remainingRequests = 0) {
  const node = await Node.create({
    name: depth === 0 ? faker.commerce.department() : faker.commerce.productAdjective(),
    type: "folder",
    collection: collectionId,
    parent,
  });

  const numChildren = faker.number.int({ min: 2, max: 4 });

  for (let i = 0; i < numChildren; i++) {
    // randomly decide between creating a folder or a request
    const isFolder = Math.random() > 0.4 && depth < 3; // limit depth to 3
    if (isFolder) {
      await createFolderTree(collectionId, node._id, depth + 1, remainingRequests);
    } else if (remainingRequests > 0) {
      const request = await createRequestDoc(collectionId);
      await Node.create({
        name: request.name,
        type: "request",
        collection: collectionId,
        parent: node._id,
        request: request._id,
      });
      remainingRequests--;
    }
  }

  return node;
}

async function seed() {
  console.log(MONGO_URI)
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB ✅");

  // Clean old data
  await Promise.all([
    Workspace.deleteMany({}),
    Collection.deleteMany({}),
    Node.deleteMany({}),
    Request.deleteMany({}),
  ]);

  const workspaces = [];

  for (let w = 0; w < WORKSPACES_TO_CREATE; w++) {
    const workspace = await Workspace.create({
      name: `Workspace ${w + 1}`,
      maxAllowedUsers: 100,
    });

    const numCollections = randomBetween(COLLECTIONS_PER_WORKSPACE);
    const collections = [];

    for (let c = 0; c < numCollections; c++) {
      const collection = await Collection.create({
        name: faker.commerce.department(),
        description: faker.company.catchPhrase(),
        owner: null,
      });

      const totalRequests = randomBetween(REQUESTS_PER_COLLECTION);

      // Build folder tree and attach to collection
      const root = await createFolderTree(collection._id, null, 0, totalRequests);

      collection.rootNode = root._id;
      await collection.save();

      collections.push(collection._id);
    }

    workspace.collections = collections;
    await workspace.save();
    workspaces.push(workspace);
  }
  console.log("condition hit")

  console.log(`🌱 Seeded ${workspaces.length} workspaces successfully`);
  await mongoose.disconnect();
  console.log("Database connection closed 🔒");
}

seed().catch(console.error);
