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
  AvatarGroup,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import Banner from './Banner';
import { io } from 'socket.io-client';

const socket = io('https://chatconnect.up.railway.app/');

const ChatDetails = ({ chatId, del, setDel }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [chat, setChat] = useState([]);
  const messageRef = useRef(null);
  const boxRef = useRef(null);
  const senderId = localStorage.getItem('chatconnectID');
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit('join-chat', chatId);
  }, [chatId]);

  useEffect(() => {
    setLoading(true);
    const fetchChatDetails = async () => {
      const response = await fetch(
        `https://chatconnect.up.railway.app/chatconnect/api/chats/${chatId}`
      );
      const data = await response.json();
      console.log(data);
      setChat(data);
      setParticipants(data.participants);
    };

    const fetchMessages = async () => {
      const response = await fetch(
        `https://chatconnect.up.railway.app/chatconnect/api/messages?chatID=${chatId}`
      );
      const data = await response.json();
      setMessages(data);
    };

    if (chatId) {
      fetchChatDetails()
        .then(() => fetchMessages()
          .then(() => setLoading(false)));
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
    await fetch(
      `https://chatconnect.up.railway.app/chatconnect/api/chats/${chatId}`,
      {
        method: 'DELETE',
      }
    );
    setDel(true);
    navigate('/home');
  };

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
          {participants.length > 2 ? (
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
                <AvatarGroup max={3}>
                  {chat.participants.map((participant) => (
                    <Avatar src={participant?.profilePicture} />
                  ))}
                </AvatarGroup>
                <Typography>{chat.groupName}</Typography>
              </Stack>
              <DeleteRoundedIcon
                onClick={deleteChat}
                sx={{ color: 'tomato', cursor: 'pointer' }}
              />
            </Stack>
          ) : (
            participants.map((participant) => {
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
            })
          )}
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
