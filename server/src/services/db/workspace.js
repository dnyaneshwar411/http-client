import config from "@/config/config"
import Workspace from "@/database/models/workspace"
import dbConnect from "@/lib/database"

export const findWorkspacesByUserId = async function (userId, fields = "") {
  dbConnect()
  return await Workspace
    .find({ users: userId })
    .select(fields)
    .lean()
}

export const workspacesCreatedByUser = async function (userId) {
  dbConnect();
  return await Workspace
    .countDocuments({ owner: userId })
}

export const createWorkSpaceForUser = async function (userId) {
  dbConnect()
  await Workspace.create({
    owner: userId,
    users: [userId],
    name: "",
    maxAllowedUsers: config.MAX_ALLOWED_USER_PER_WORKSPACE
  })
}

export const updateWorkspaceWithFilter = async function (filter, payload = {}) {
  dbConnect()
  await Workspace.findOneAndUpdate(filter, {
    $set: payload
  })
}