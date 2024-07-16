const { default: mongoose } = require("mongoose");

const generate = require("../../../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,
    deletedAt: Date
  },
  {
    // khi sét timestamps là true thì sẽ tự tạo sản createAt và updateAt
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "users"); // cái tham số thứ 3 là tên connection product

module.exports = User;

// tk MongoDB
// username: lenhathuy9a6
// Password: zPL4peRvD3BIrhis
