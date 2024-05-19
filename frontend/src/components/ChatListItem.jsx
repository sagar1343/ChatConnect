import {
  ListItemAvatar,
  ListItemText,
  Avatar,
  AvatarGroup,
} from '@mui/material';

const ChatListItem = ({ item }) => {
  return (
    <>
      <ListItemAvatar>
        {item.groupName ? (
          <AvatarGroup max={3}>
            {item.participants.map((participant) => (
              <Avatar src={participant?.profilePicture} />
            ))}
          </AvatarGroup>
        ) : (
          <Avatar src={item?.profilePicture} />
        )}
      </ListItemAvatar>
      <ListItemText>
        {item.groupName ? item.groupName : item?.firstName}
      </ListItemText>
    </>
  );
};

export default ChatListItem;
