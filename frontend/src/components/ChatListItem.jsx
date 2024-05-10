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
          alt={item.name}
          src={item.image}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.primary}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              {item.name}
            </Typography>
            {item.secondary}
          </>
        }
      />
    </>
  );
};

export default ChatListItem;
