import { useState } from 'react';
import ChatList from './ChatList';
import { Grid, useTheme, useMediaQuery, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import ChatDetails from './ChatDetails';
import Banner from './Banner';
import { useLocation } from 'react-router-dom';

const GridContainer = () => {
  const [active, setActive] = useState(null);
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid
      padding={2}
      container
      height='calc(100vh - 71.27px)'
      rowGap={2}
    >
      <Grid
        item
        height='100%'
        sx={{ overflowY: 'scroll' }}
        xs={12}
        md={4}
      >
        {active && !media ? (
          <Grid
            item
            height='100%'
            padding={1}
            xs={12}
            md={8}
            bgcolor='#e5e5e5'
            sx={{ overflowY: 'scroll' }}
          >
            <ChatDetails activeUserID={active} />
          </Grid>
        ) : (
          [
            <SearchBar
              key='search'
              setUsers={setUsers}
            />,
            <ChatList
              key='list'
              active={active}
              setActive={setActive}
              users={users}
            />,
          ]
        )}
      </Grid>
      {media && (
        <Grid
          item
          height='100%'
          padding={1}
          xs={12}
          md={8}
          bgcolor='#e5e5e5'
          sx={{ overflowY: 'scroll' }}
        >
          {active ? <ChatDetails activeUserID={active} /> : <Banner />}
        </Grid>
      )}
    </Grid>
  );
};

export default GridContainer;
