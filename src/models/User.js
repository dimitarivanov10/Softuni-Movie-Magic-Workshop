import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    match: [/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/],
    minLength: [10, "Email should be at least 10 characters long!"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [/^[a-zA-Z0-9]+$/],
    minLength: [6, "Password should be at least 6 characters!"]
  },
});

userSchema.pre("save", async function () {
  // const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, 12);
});

const User = model("User", userSchema);

export default User;
