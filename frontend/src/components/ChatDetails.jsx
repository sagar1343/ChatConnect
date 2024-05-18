import {
  Box,
  TextField,
  Fab,
  Stack,
  Divider,
  Backdrop,
  CircularProgress,
  Typography,
  Avatar,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import Banner from './Banner';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/');

const ChatDetails = ({ chatId, del, setDel }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const messageRef = useRef(null);
  const boxRef = useRef(null);
  const senderId = localStorage.getItem('chatconnectID');
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit('join-chat', chatId);
  }, [chatId]);

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
    setDel(false);
  }, [chatId]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleRecievedMessage = (newMessage) => {
      console.log('Received message:', newMessage);
      setMessages((prevMessage) => [...prevMessage, newMessage]);
    };
    socket.on('message', handleRecievedMessage);

    return () => {
      socket.off('message', handleRecievedMessage);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = messageRef.current.value.trim();

    const newMessage = {
      chatID: chatId,
      senderID: senderId,
      content: content,
    };

    socket.emit('sendMessage', newMessage);
    messageRef.current.value = '';
  };

  const deleteChat = async () => {
    await fetch(`http://localhost:8000/chatconnect/api/chats/${chatId}`, {
      method: 'DELETE',
    });
    setDel(true);
    navigate('/home');
  };
  const receiverId = participants.find(
    (participant) => participant._id !== senderId
  )?._id;

  if (del) return <Banner />;

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
          {participants.map((participant) => {
            if (participant._id !== senderId) {
              return (
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Stack
                    padding={1}
                    direction='row'
                    spacing={2}
                    alignItems='center'
                  >
                    <Avatar src={participant.profilePicture} />
                    <Typography>{participant.firstName}</Typography>
                  </Stack>
                  <DeleteRoundedIcon
                    onClick={deleteChat}
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                  />
                </Stack>
              );
            }
          })}
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
