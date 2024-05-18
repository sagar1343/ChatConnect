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
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
