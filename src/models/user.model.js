const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // boleh null untuk user yang daftar via email/password
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false, // tidak ikut ke-return default saat query, harus eksplisit .select('+password')
    },
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
