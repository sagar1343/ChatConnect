import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Message = ({ authUserID, senderID, message, createdAt }) => {
  const align = senderID === authUserID ? 'flex-end' : 'flex-start';

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={align}
      gap={1}
      m={2}
    >
      <Box
        p={1}
        sx={{
          maxWidth: '15rem',
          whiteSpace: 'normal',
          textOverflow: 'wrap',
          borderRadius: '20px',
          bgcolor: '#2097f4',
        }}
      >
        <Typography>{message}</Typography>
      </Box>
      <Typography
        px={1}
        fontSize='13px'
      >
        {new Date(createdAt).toLocaleTimeString()}
      </Typography>
    </Box>
  );
};

export default Message;
