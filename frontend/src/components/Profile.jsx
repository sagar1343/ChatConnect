import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem('chatconnectID');
  const { data, loading } = useFetch(`users/${id}`);

  useEffect(() => {
    if (data) setUser(data.user);
  }, [data]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Backdrop
          open={true}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <Container
          sx={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
            }}
          >
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
            <Typography
              variant='h4'
              gutterBottom
            >
              {user?.firstName}
            </Typography>
            <Typography
              variant='body1'
              gutterBottom
            >
              Email: {user?.email}
            </Typography>
            <Box mt={4}>
              <Button
                onClick={() => navigate('/home')}
                variant='contained'
              >
                Back
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Profile;
