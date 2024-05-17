import { Fragment, useEffect, useState } from 'react';
import { List, Divider, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ChatListItem from './ChatListItem';
import { useNavigate } from 'react-router-dom';

const ChatList = ({ active, setActive }) => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('chatconnectID');

  useEffect(() => {
    fetch(`http://localhost:8000/chatconnect/api/chats?id=${userId}`)
      .then((res) => res.json())
      .then((json) => json.chats)
      .then((chats) =>
        chats.map((chat) => ({
          ...chat,
          participants: chat.participants.filter(
            (participant) => participant._id !== userId
          ),
        }))
      )
      .then((filteredChats) => {
        setChats(filteredChats);
        console.log(filteredChats);
      })
      .catch((err) => console.log(err));
  }, []);

  const chatItems = chats.map((item) => (
    <Fragment key={item._id}>
      <ListItem
        sx={{ cursor: 'pointer' }}
        className={active === item._id ? 'active' : ''}
        alignItems='flex-start'
        onClick={() => {
          setActive(item._id);
          navigate(`?chat=${item._id}`);
        }}
      >
        <ChatListItem item={item.participants[0]} />
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
      {chats.length != 0 ? (
        chatItems
      ) : (
        <Typography
          textAlign='center'
          fontSize={20}
          fontWeight='bold'
          color='gray'
        >
          No Chats Found
        </Typography>
      )}
    </List>
  );
};
export default ChatList;
