const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
