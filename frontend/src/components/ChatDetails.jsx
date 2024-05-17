import {
  Box,
  TextField,
  Fab,
  Stack,
  Divider,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';

const ChatDetails = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const messageRef = useRef(null);
  const boxRef = useRef(null);
  const senderId = localStorage.getItem('chatconnectID');

  useEffect(() => {
    const fetchChatDetails = async () => {
      const response = await fetch(
        `http://localhost:8000/chatconnect/api/chats/${chatId}`
      );
      const data = await response.json();
      setParticipants(data.participants);
    };

    const fetchMessages = async () => {
      const response = await fetch(
        `http://localhost:8000/chatconnect/api/messages?chatID=${chatId}`
      );
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    };

    if (chatId) {
      fetchChatDetails();
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  const postMessage = async (newMessage) => {
    const res = await fetch('http://localhost:8000/chatconnect/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });
    const jsonRes = await res.json();
    return jsonRes;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = messageRef.current.value.trim();

    const newMessage = {
      chatID: chatId,
      senderID: senderId,
      content: content,
    };

    const res = await postMessage(newMessage);
    setMessages((prevMessages) => [...prevMessages, res]);
    messageRef.current.value = '';
  };

  const receiverId = participants.find(
    (participant) => participant._id !== senderId
  )?._id;

  return (
    <>
      {loading ? (
        <Backdrop
          open={true}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <Box
          height='100%'
          position='relative'
        >
          <Box
            display='flex'
            alignItems='center'
            padding={2}
          >
            {participants.map((participant) => {
              if (participant._id !== senderId) {
                return participant.firstName;
              }
            })}
          </Box>
          <Divider />
          <Box
            height='calc(100% - 140px)'
            sx={{ overflowY: 'scroll' }}
            ref={boxRef}
          >
            {messages.map((item) => (
              <Message
                key={item._id}
                authUserID={senderId}
                senderID={item.senderID}
                message={item.content}
                createdAt={item.createdAt}
                receiverId={receiverId}
              />
            ))}
          </Box>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            direction='row'
            justifyContent='space-between'
            position='absolute'
            bottom='1.3rem'
            right='1rem'
            left='1rem'
          >
            <TextField
              inputRef={messageRef}
              required
              sx={{ bgcolor: '#fff', flexGrow: 1, borderRadius: 2 }}
              placeholder='Message'
              autoComplete='off'
            />
            <Fab
              type='submit'
              sx={{ marginInline: '1rem' }}
              color='primary'
            >
              <SendIcon />
            </Fab>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ChatDetails;
