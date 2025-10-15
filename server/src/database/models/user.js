import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["not-verified", "active", "in-active"],
    default: "not-verified",
  },
  password: {
    type: String,
    select: false,
  },
  otp: {
    type: String,
  },
  expiration: {
    type: Date,
  },
  googleUserId: {
    type: String
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  provider: {
    type: String,
    trim: true,
  },
  identificationId: {
    type: String,
    trim: true,
  },
  providerUserId: {
    type: String,
    trim: true,
  },
  approvedScopes: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
    trim: true,
  },
  givenName: {
    type: String,
    trim: true,
  },
  familyName: {
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  externalAccountId: {
    type: String,
    trim: true,
  },
}, { timestamps: true });


const User = mongoose.models.User || model("User", userSchema);

export default User;