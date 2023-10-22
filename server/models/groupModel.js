import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  description: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Group",groupSchema)
