import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  chatID: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
