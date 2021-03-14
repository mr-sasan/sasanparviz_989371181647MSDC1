const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LoginCodeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    test: {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginCode", LoginCodeSchema);
