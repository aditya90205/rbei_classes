import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    course: {
      type: [String],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      required: true,
      default: "student",
    },
    isApprove: {
      type: Boolean,
      default: function () {
        return this.role === "admin" ? true : false;
      },
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
