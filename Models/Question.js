const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Schema.Types.Number,
      required: true,
    },
    score: {
      type: Schema.Types.Number,
      required: true,
    },
    answers: [
      {
        type: Schema.Types.String,
        required: true,
      },
    ],
    // correctAnswer: {
    //   type: Schema.Types.Number,
    //   required: true,
    // },
    answerIndex: {
      type: Schema.Types.Number,
      required: false,
      default: -1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
