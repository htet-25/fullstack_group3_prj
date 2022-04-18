const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    passed : Boolean,
    testType : String
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
