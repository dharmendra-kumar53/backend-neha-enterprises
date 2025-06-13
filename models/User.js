import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  address: {
    line1: { type: String, default: '' },
    line2: { type: String, default: '' },
  },
  gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
  dob: { type: String, default: '' },
  image: { type: String, default: '' },
});

export default mongoose.model("User", userSchema);
