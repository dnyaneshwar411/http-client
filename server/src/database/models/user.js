import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone_number: {
    type: String
  }
})

const User = model("User", userSchema);

export default User;