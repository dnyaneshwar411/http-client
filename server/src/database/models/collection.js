import mongoose, { Schema, model } from "mongoose";

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    rootNode: {
      type: Schema.Types.ObjectId,
      ref: "Node",
    },
  },
  { timestamps: true }
);

const Collection = mongoose.models.Collection || model("Collection", collectionSchema);

export default Collection;