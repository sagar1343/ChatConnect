import { Fragment, useEffect, useState } from 'react';
import {
  List,
  Divider,
  Drawer,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ChatListItem from './ChatListItem';
import { useNavigate } from 'react-router-dom';
import NewChatPanel from './NewChatPanel';
import GroupBox from './GroupBox';

const ChatList = ({ active, setActive, del }) => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('chatconnectID');

  const toggleDrawer = () => {
    setOpen((value) => !value);
  };
  useEffect(() => {
    fetch(
      `https://chatconnect.up.railway.app/chatconnect/api/chats?id=${userId}`
    )
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
      })
      .catch((err) => console.log(err));
  }, [open, del, created]);

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
        <ChatListItem item={item.groupName ? item : item.participants[0]} />
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
      <Stack
        direction='row'
        marginBottom={2}
        spacing={3}
      >
        <Button
          onClick={() => toggleDrawer(true)}
          variant='contained'
        >
          New Chat
        </Button>
        <GroupBox
          setCreated={setCreated}
          chats={chats}
        />
        <Drawer
          open={open}
          onClose={() => toggleDrawer(false)}
        >
          <NewChatPanel toggleDrawer={toggleDrawer} />
        </Drawer>
      </Stack>
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
