import Message from "./models/messageModel.js";

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('Connection Established!!', socket.id);

        socket.on('join-chat', (chatID) => {
            socket.join(chatID);
            console.log('chat joined with ID:', chatID)
        })

        socket.on('sendMessage', async (message) => {
            console.log('sent message', message);
            try {
                const newMessage = new Message(message);
                await newMessage.save();
                const createdMessage = await Message.findById(newMessage._id);
                io.to(message.chatID).emit('message', createdMessage);
                console.log('message', createdMessage);
            } catch (error) {
                console.error(error);
            }
        })

    });
}

export default socketHandler;