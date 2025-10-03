import { Schema } from "mongoose";

const User = new Schema({
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

export default User;