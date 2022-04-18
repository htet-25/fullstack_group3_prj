const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  loginId: { type: String, required: true, unique: true },
  loginPassword: { type: String, required: true },
  loginType: { type: String, required: true },
});

loginSchema.plugin(uniqueValidator);

loginSchema.pre("save", function (next) {
  const login = this;
  bcrypt.hash(login.loginPassword, 10, (_error, hash) => {
    login.loginPassword = hash;
    next();
  });
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
