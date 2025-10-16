import Node from "@/database/models/node"
import Workspace from "@/database/models/workspace";
import dbConnect from "@/lib/database"
import { _throwError } from "@/lib/http-request";

const buildNewNodePayload = function (body) {
  switch (body.type) {
    case "folder":
      return {
        name: body.name,

      }
    case "request":
      return {
        name: body.name,

      }
    default:
      _throwError(
        400, "Bad Request: type or node can be either of - folder, request!"
      )
  }
}




export const checkIfUserHasAccessToNodePath = async function (userId, nodeId) {
  dbConnect();
  const { collection } = await Node
    .findById(nodeId)
    .select("collection")
    .lean()
  return !!await Workspace
    .exists({
      users: userId,
      collections: collection
    })
}

export const createNewNodeWithFilter = async function (nodeId, collectionId, body) {
  dbConnect()
  const payload = buildNewNodePayload(body);

  await Node.create({

  })
}