import Message from '../models/messageModel.js';

export const getMessage = async (req, res) => {
    try {
        const message = await Message.find({ chatID: req.query.chatID });
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createMessage = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        const createdMessage = await Message.findOne(message._id);
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}