const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserAnswersSchema = new Schema(
  {
    loginCodeId: {
      type: Schema.Types.ObjectId,
      ref: "LoginCode",
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
    userRoll: {
      type: Schema.Types.Number,
      required: true,
    },
    userAnswers: [
      {
        type: Schema.Types.Mixed,
        required: true,
      },
    ],
    score: {
      type: Schema.Types.Number,
      required: true,
    },
    accepted: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAnswers", UserAnswersSchema);
