const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startTimestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endTimestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", TestSchema);
