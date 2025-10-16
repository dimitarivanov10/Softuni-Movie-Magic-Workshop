import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/tokenUtils.js";

export default {
  async register(userData) {
    const userExists = await User.exists({ email: userData.email });
    if (userExists) {
      throw new Error("User already exists!");
    }
    const user = await User.create(userData);
    const token = generateAuthToken(user);

    return token;
  },
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid username or password!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid username or password!");
    }
    const token = generateAuthToken(user);
    return token;
  },
};
