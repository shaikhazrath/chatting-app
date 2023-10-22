import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  creationDateTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message",messageSchema)

