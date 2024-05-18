import { useState } from 'react';
import ChatList from './ChatList';
import { Grid, useTheme, useMediaQuery, Typography } from '@mui/material';
import ChatDetails from './ChatDetails';
import Banner from './Banner';

const GridContainer = () => {
  const [active, setActive] = useState(null);
  const [del, setDel] = useState(false);
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
            <ChatDetails
              chatId={active}
              del={del}
              setDel={setDel}
            />
          </Grid>
        ) : (
          <ChatList
            key='list'
            active={active}
            setActive={setActive}
            del={del}
          />
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
          {active ? (
            <ChatDetails
              chatId={active}
              del={del}
              setDel={setDel}
            />
          ) : (
            <Banner />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default GridContainer;
