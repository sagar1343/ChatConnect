import { Box, TextField, Fab, Stack, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRef } from 'react';
const ChatDetails = () => {
  const messageRef = useRef(null);
  const boxRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // update db
    console.log(messageRef.current.value);
    messageRef.current.value = '';
  };
  return (
    <>
      <Box ref={boxRef}></Box>
      <Box
        component='form'
        onSubmit={(event) => handleSubmit(event)}
      >
        <Stack
          direction='row'
          width='66%'
          justifyContent='space-between'
          position='fixed'
          bottom='1rem'
        >
          <TextField
            inputRef={messageRef}
            required
            color='success'
            sx={{
              bgcolor: '#fff',
              flexGrow: 1,
            }}
            placeholder='Message'
            autoComplete='off'
          ></TextField>
          <Fab
            type='submit'
            sx={{ marginInline: '1rem' }}
            color='success'
          >
            <SendIcon />
          </Fab>
        </Stack>
      </Box>
    </>
  );
};

export default ChatDetails;
