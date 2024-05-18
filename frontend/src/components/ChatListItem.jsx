import { ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const ChatListItem = ({ item }) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          alt={item?.firstName}
          src={item?.profilePicture}
        />
      </ListItemAvatar>
      <ListItemText>{item?.firstName}</ListItemText>
    </>
  );
};

export default ChatListItem;
