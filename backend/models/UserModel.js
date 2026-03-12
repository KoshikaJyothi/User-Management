import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: [true, "Name is mandatory"] },
  age: { type: Number, required: true },
  email: { type: String, required: [true, "Email is required"], unique: true },
  dateofbirth: { type: Date },
  mobileNumber: { type: Number },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false,
  strict: "throw"
})

const UserModel = model('user', UserSchema)

export default UserModel
