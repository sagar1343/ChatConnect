import { Fragment } from 'react';
import { List, Divider, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ChatListItem from './ChatListItem';

const ChatList = ({ active, setActive, users }) => {
  const usersList = users.map((item) => (
    <Fragment key={item._id}>
      <ListItem
        sx={{ cursor: 'pointer' }}
        className={active === item.id ? 'active' : ''}
        alignItems='flex-start'
        onClick={() => {
          setActive(item._id);
        }}
      >
        <ChatListItem item={item} />
      </ListItem>
      <Divider
        variant='inset'
        component='li'
      />
    </Fragment>
  ));

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'scroll' }}
    >
      {users.length != 0 ? (
        usersList
      ) : (
        <Typography
          textAlign='center'
          fontSize={20}
          fontWeight='bold'
          color='gray'
        >
          No User Found
        </Typography>
      )}
    </List>
  );
};
export default ChatList;
