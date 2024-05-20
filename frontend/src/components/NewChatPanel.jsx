import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchBar from './SearchBar';
import { ListItemAvatar, Avatar, Typography } from '@mui/material';

const NewChatPanel = ({ toggleDrawer }) => {
  const [users, setUsers] = useState([]);
  const handleClick = async (item) => {
    const senderId = localStorage.getItem('chatconnectID');
    try {
      const response = await fetch(
        'https://chatconnect.up.railway.app/chatconnect/api/chats',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participants: [senderId, item._id],
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to create chat');
      }
      await response.json();
    } catch (error) {
      console.error('Error creating chat:', error.message);
    }
    toggleDrawer(false);
  };
  return (
    <>
      <Box
        sx={{ width: 270 }}
        role='presentation'
        p={2}
      >
        <SearchBar setUsers={setUsers} />,
        <Divider />
        <List>
          {users.length === 0 ? (
            <Typography
              color='gray'
              fontSize='1rem'
              align='center'
            >
              No User Found
            </Typography>
          ) : (
            users.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleClick(item)}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src={item.profilePicture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.firstName}
                    secondary={item.email}
                    sx={{ overflow: 'hidden' }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </>
  );
};

export default NewChatPanel;
