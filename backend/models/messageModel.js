import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  chatID: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachment: { type: Buffer },
  sendingTime: { type: Date, default: Date.now() },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
