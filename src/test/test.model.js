/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestSchema = new Schema({
  question: {
    type: String,
    minlength: 4,
    maxlength: 320,
  },
  answers: {
    type: [String],
    minlength: 2,
    maxlength: 7,
  },
  nameTest: {
    type: String,
  },
  rightAnswer: {
    type: String,
  },
});

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
