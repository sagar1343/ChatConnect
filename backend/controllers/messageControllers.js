import Message from '../models/messageModel.js';

export const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        res.status(200).json({ message })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createMessage = async (req, res) => {
    try {
        const message = await Message(req.body);
        message.save();
        res.status(201).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}