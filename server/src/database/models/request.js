import mongoose, { Schema, model } from "mongoose";

const paramSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  value: {
    type: String,
    trim: true
  },
  selected: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const headerSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  value: {
    type: String,
    trim: true
  },
  selected: {
    type: Boolean,
    default: true
  },
  mandatory: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const formDataItemSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ["file", "text"],
    default: "text"
  },
  value: {
    type: String,
    trim: true
  },
  selected: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const bodySchema = new Schema({
  selected: {
    type: String,
    enum: ["none", "form-data", "urlencoded", "raw"],
    default: "none"
  },

  formData: [formDataItemSchema],

  json: Schema.Types.Mixed,

  urlencoded: Schema.Types.Mixed
}, { _id: false });

const requestSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    default: "GET"
  },
  url: { type: String, trim: true },

  params: [paramSchema],
  headers: [headerSchema],
  body: bodySchema,


  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection"
  }
}, { timestamps: true });

export const Request = mongoose.models.Request || model("Request", requestSchema);

export default Request;