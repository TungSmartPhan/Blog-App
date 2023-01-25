import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars"],
    },
    account: {
      type: String,
      require: [true, "Please add your email or phone number"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add your password"],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/fpt-greenwich-vietnam-da-nang/image/upload/v1641319264/avatar/avatar_fco8ch.jpg",
    },
    type: {
      type: String,
      default: "normal", //fast
    },
  },
  { timestamps: true }
);
//console.log(userSchema);
export default mongoose.model("User", userSchema);
