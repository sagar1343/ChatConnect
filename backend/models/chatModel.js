import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
  participants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
});
chatSchema.index({ participants: 1 }, { unique: true })
const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
