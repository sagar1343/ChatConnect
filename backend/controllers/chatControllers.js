import Chat from '../models/chatModel.js';
import User from '../models/userModel.js'

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ 'participants': { $in: [req.query.id] } }).populate('participants', 'firstName');
        res.status(200).json({ results: chats.length, chats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createChat = async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        await newChat.save()
        res.status(201).json({ newChat });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getChat = async (req, res) => {
    try {
        const chats = await Chat.findById(req.params.id).populate('participants', 'firstName');
        res.status(200).json(chats);
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