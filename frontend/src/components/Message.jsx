import React from 'react';
import { Box, Typography } from '@mui/material';
const Message = ({ message }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={1}
      m={2}
    >
      <Box
        p={1}
        sx={{
          maxWidth: '15rem',
          display: 'inline-block',
          whiteSpace: 'normal',
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
        {'22/12/21'}
      </Typography>
    </Box>
  );
};

export default Message;
