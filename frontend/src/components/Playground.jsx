import { Button, Box, TextField, Typography, CssBaseline } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const Playground = () => {
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newSocket, setNewSocket] = useState(null);

  const displayMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('connect', () => {
      console.log('Connected with ID:', socket.id);
      setNewSocket(socket);
    });
    socket.on('recieveMessage', (message) => {
      console.log('Recieved', message);
      displayMessage(message);
    });

    return () => {
      socket.off('recieveMessage');
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    const message = messageRef.current.value;
    newSocket.emit('sendMessage', message);
    messageRef.current.value = '';
  };

  return (
    <>
      <Box>{`Connected with id:${
        newSocket === null ? 'null' : newSocket.id
      }`}</Box>
      <Box
        marginY={10}
        display='flex'
        flexDirection='column'
        gap={3}
        justifyContent='center'
        alignItems='center'
      >
        <Box
          display='flex'
          gap={3}
          alignItems='center'
        >
          <TextField
            inputRef={messageRef}
            placeholder='message..'
          />
          <Button
            variant='contained'
            color='success'
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
        <Box>
          {messages.map((message, index) => (
            <Typography key={index}>{message}</Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Playground;
