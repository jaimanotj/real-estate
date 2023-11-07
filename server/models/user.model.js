import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg",
    },
  },
  { timestamps: true } //to have created at & updated at time details of the user
);

const User = mongoose.model("User", userSchema);

export default User;
