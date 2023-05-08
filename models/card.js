const mongoose = require("mongoose");
const { regex } = require("../constants");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regex.test(v),
        message: "{VALUE} is not a valid url",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    createdAt: {
      date: { type: Date, default: Date.now },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("card", cardSchema);
