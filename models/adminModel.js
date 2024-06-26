import mongoose from "mongoose";
import validator from "validator";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

AdminSchema.methods.removePassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Admin", AdminSchema);
