import { Box, TextField, Fab, Stack, Chip, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Backdrop, CircularProgress } from '@mui/material';
import Message from './Message';

const ChatDetails = ({ activeUserID }) => {
  const [activeUser, setActiveUser] = useState({});
  const [message, setMessage] = useState([]);
  const messageRef = useRef(null);
  const boxRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // update db
    setMessage([...message, messageRef.current.value]);
    console.log(messageRef.current.value);
    messageRef.current.value = '';
    boxRef.current.scrollTo({ bottom: 0 });
  };

  const { data, loading } = useFetch(
    `http://localhost:8000/chatconnect/api/users/${activeUserID}`
  );
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [message]);
  useEffect(() => {
    setActiveUser(data?.user);
  }, [activeUserID, data]);
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
          onSubmit={(event) => handleSubmit(event)}
        >
          <Box
            display='flex'
            alignItems='center'
            padding={2}
          >
            {activeUser?.firstName}
          </Box>
          <Divider />
          <Box
            height='calc(100% - 140px)'
            sx={{ overflowY: 'scroll' }}
            ref={boxRef}
          >
            {message.map((item, index) => (
              <Message
                key={index}
                message={item}
              />
            ))}
          </Box>
          <Stack
            component='form'
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
              sx={{
                bgcolor: '#fff',
                flexGrow: 1,
                borderRadius: 2,
              }}
              placeholder='Message'
              autoComplete='off'
            ></TextField>
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
