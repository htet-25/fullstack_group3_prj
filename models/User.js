const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  fName: String,
  lName: String,
  DOB: Date,
  address: String,
  carDetails: String,
  license: {
    type: String,
    required: true
  },
  image1: String,
  image2: String,
  myAppointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  testType: String,
  licenseType: String,
  result: String,
  comment: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
