import { TextField, Fab, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const ChatDetails = () => {
  return (
    <Stack
      direction='row'
      width='66%'
      justifyContent='space-between'
      position='fixed'
      bottom='1rem'
    >
      <TextField
        color='success'
        sx={{
          bgcolor: '#fff',
          flexGrow: 1,
        }}
        placeholder='Message'
      ></TextField>
      <Fab
        sx={{ marginInline: '1rem' }}
        color='success'
      >
        <SendIcon />
      </Fab>
    </Stack>
  );
};

export default ChatDetails;
