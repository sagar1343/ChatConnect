import { useState } from 'react';
import ChatList from './ChatList';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import SearchBar from './SearchBar';
import ChatDetails from './ChatDetails';
import Banner from './Banner';

const GridContainer = () => {
  const [active, setActive] = useState(-1);
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid
      marginTop={0}
      container
      spacing={1}
      height='calc(100vh - 64px)'
    >
      <Grid
        item
        height='100%'
        sx={{ overflowY: 'scroll' }}
        xs={12}
        md={4}
      >
        <SearchBar setUsers={setUsers} />
        <ChatList
          active={active}
          setActive={setActive}
          users={users}
        />
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
          {active === -1 ? <Banner /> : <ChatDetails />}
        </Grid>
      )}
    </Grid>
  );
};

export default GridContainer;
