import { Schema, model } from "mongoose";

const nodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["folder", "request"],
      required: true,
    },

    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Node",
      default: null,
    },

    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Node",
      },
    ],

    request: {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },

    path: {
      type: String,
      default: "",
      index: true,
    },
  },
  { timestamps: true }
);

const Node = model("Node", nodeSchema);

export default Node;