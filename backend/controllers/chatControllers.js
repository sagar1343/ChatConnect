import Chat from '../models/chatModel.js';

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json({ results: chats.length, chats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createChat = async (req, res) => {
    try {
        const newChat = await Chat(req.body);
        newChat.save()
        res.status(201).json({ newChat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        res.status(200).json({ chat })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findByIdAndDelete(req.params.id);
        res.status(204).json({ chat })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}