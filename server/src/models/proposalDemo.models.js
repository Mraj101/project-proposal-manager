const mongoose = require("mongoose");

const proposalDemoSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProposalDemo", proposalDemoSchema);
