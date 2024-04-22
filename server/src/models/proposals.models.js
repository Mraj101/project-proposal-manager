const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
  //   userName: {
  //     type: String,
  //     required: true,
  //     lowercase: true,
  //     index: true
  //   },
  //   userImage: {
  //     type: String,
  //     required: true,
  //   },
  //   studentId: {
  //     type: String,
  //     required: true,
  //   },
  //   department: {
  //     type: String,
  //     required: true,
  // },
  //   userEmail: {
  //     type: String,
  //     required: true,
  //     lowercase: true,
  //     index: true
  //   },
    // userImage: {
    //   type: String,
    //   required: true,
    //   lowercase: true,
    //   index: true
    // },
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
    supervisorId: {
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
    },
    isAccepted:{
      type: Boolean,
      default: false,
    },
    isRejected:{
      type: Boolean,
      default: false,
    },
    isAccepetedByHOD:{
      type: Boolean,
      default: false,
    },
    isRejectedByHOD:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposals", proposalSchema);