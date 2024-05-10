import React from 'react';
import Navbar from './components/Navbar.jsx';
import ChatList from './components/ChatList.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Divider, Grid } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Grid
          marginTop={0}
          container
          spacing={1}
          height='calc(100vh - 64px)'
        >
          <Grid
            item
            lg={4}
          >
            <ChatList />
          </Grid>
          <Divider
            orientation='vertical'
            flexItem
          />
          <Grid
            item
            lg={8}
            bgcolor={'red'}
          >
            <Box>afafwdsg</Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
