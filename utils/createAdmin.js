import Admin from "../models/adminModel.js";
import prompt from "prompt-sync";
import mongoose from "mongoose";
import { hashPassword } from "./auth.js";
import "dotenv/config";

const read = prompt();

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connection Successful!");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

const name = read("name: ");
const email = read("email: ");
const password = read("password: ");

let admin = await Admin.findOne({ email });
if (admin) {
  console.log("User already exists");
  process.exit(0);
}

const hashedPassword = await hashPassword(password);
admin = {
  name,
  email,
  password: hashedPassword,
};
await Admin.create(admin);
console.log("Admin Account Created");
process.exit(0);
