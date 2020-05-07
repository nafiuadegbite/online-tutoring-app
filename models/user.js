const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const usersSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    subjects: {
      type: Array
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tutor"
      }
    ]
  },
  { timestamps: true }
);

usersSchema.methods.generateAuthToken = async () => {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, "idmcalculus");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
module.exports = mongoose.model("Users", usersSchema);
