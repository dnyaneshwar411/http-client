import Collection from "@/database/models/collection";
import Node from "@/database/models/node";
import Workspace from "@/database/models/workspace"
import dbConnect from "@/lib/database";
import { _throwError } from "@/lib/http-request"

export const retrieveUserCollections = async function (
  userId,
  workspaceId
) {
  dbConnect()

  const workspace = await Workspace
    .findOne({
      users: userId,
      _id: workspaceId
    })
    .select("collections")
    .lean()

  if (!workspace) _throwError(400, "No such workspace found!");

  if (workspace.collections?.length === 0) return [];

  const collections = await Node
    .find({
      collection: {
        $in: workspace.collections
      }
    })
    .populate("collection", "name description")

  return collections;
}



export const createNewCollection = async function (
  userId,
  workspaceId,
  body
) {
  dbConnect()

  const workspace = await Workspace.exists({
    _id: workspaceId,
    users: userId
  });

  if (!Boolean(workspace)) _throwError(400, "No workspace found!");

  const collection = await Collection.create(body);

  const node = await Node.create({
    name: body.name,
    description: body.description,
    type: "folder",
    collection: collection._id
  })

  await Promise.all([
    Collection.findByIdAndUpdate(collection._id, {
      rootNode: node._id
    }),
    Workspace.findByIdAndUpdate(workspace._id, {
      $push: {
        collections: collection._id
      }
    })
  ])
}



export const updateCollection = async function (
  collectionId,
  body
) {
  await Collection.findByIdAndUpdate(collectionId, {
    $set: {
      ...body
    }
  })
}