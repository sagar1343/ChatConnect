import ChatList from './ChatList';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import SearchBar from './SearchBar';
import ChatDetails from './ChatDetails';

const GridContainer = () => {
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
        md={5}
        lg={4}
      >
        <SearchBar />
        <ChatList />
      </Grid>
      {media && (
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          bgcolor='#e5e5e5'
        >
          <ChatDetails />
        </Grid>
      )}
    </Grid>
  );
};

export default GridContainer;
