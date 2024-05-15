import {
  Typography,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';

const ChatListItem = ({ item }) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          alt={item.firstName}
          // src={item.profilePicture}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.email}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              {item.firstName}
            </Typography>
          </>
        }
      />
    </>
  );
};

export default ChatListItem;
