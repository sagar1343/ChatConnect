import { Fragment } from 'react';
import { List, Divider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ChatListItem from './ChatListItem';

const ChatList = ({ active, setActive }) => {
  const chatsList = [
    {
      id: 1,
      name: 'John Doe',
      image: '/static/images/avatar/1.jpg',
      primary: 'to Jane, Mark',
      secondary: '— Looking forward to the meeting tomorrow.',
    },
    {
      id: 2,
      name: 'Alice Smith',
      image: '/static/images/avatar/2.jpg',
      primary: 'to Bob, Carol',
      secondary: '— Just finished reading that book you recommended!',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      image: '/static/images/avatar/3.jpg',
      primary: 'to Sarah',
      secondary: '— Excited for the concert next week!',
    },
    {
      id: 4,
      name: 'Emily Brown',
      image: '/static/images/avatar/4.jpg',
      primary: 'to David, Emma',
      secondary: "— Can't wait for the vacation!",
    },
    {
      id: 5,
      name: 'Daniel Wilson',
      image: '/static/images/avatar/5.jpg',
      primary: 'to Olivia',
      secondary: '— Have you tried that new restaurant downtown?',
    },
    {
      id: 6,
      name: 'Sophia Garcia',
      image: '/static/images/avatar/6.jpg',
      primary: 'to Ethan',
      secondary: '— Remember to buy milk on your way back.',
    },
    {
      id: 7,
      name: 'James Rodriguez',
      image: '/static/images/avatar/7.jpg',
      primary: 'to Mia, Noah',
      secondary: "— Don't forget to submit the report by Friday.",
    },
    {
      id: 8,
      name: 'Isabella Martinez',
      image: '/static/images/avatar/8.jpg',
      primary: 'to Liam, Ava',
      secondary: '— Congratulations on your promotion!',
    },
    {
      id: 9,
      name: 'Alexander Thompson',
      image: '/static/images/avatar/9.jpg',
      primary: 'to Harper',
      secondary: '— How was your weekend getaway?',
    },
    {
      id: 10,
      name: 'Mia Lee',
      image: '/static/images/avatar/10.jpg',
      primary: 'to James',
      secondary: "— Let's catch up over coffee sometime.",
    },
  ];

  return (
    <List
      overflowY={'scroll'}
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      {chatsList.map((item) => (
        <Fragment key={item.id}>
          <ListItem
            sx={{ cursor: 'pointer' }}
            className={active === item.id ? 'active' : ''}
            alignItems='flex-start'
            onClick={() => {
              setActive(item.id);
            }}
          >
            <ChatListItem item={item} />
          </ListItem>
          <Divider
            variant='inset'
            component='li'
          />
        </Fragment>
      ))}
    </List>
  );
};
export default ChatList;
