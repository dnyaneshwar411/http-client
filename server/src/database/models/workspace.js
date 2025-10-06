import { model, Schema } from "mongoose"

const workspaceSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  collections: {
    type: [Schema.Types.ObjectId],
    ref: "Collection"
  },
  maxAllowedUsers: {
    type: Number,
    default: 100
  }
})

const Workspace = model("Workspace", workspaceSchema)

export default Workspace;