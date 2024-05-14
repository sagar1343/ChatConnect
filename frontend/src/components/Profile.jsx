import {
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Container,
  Typography,
  Avatar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('chatconnectID');
        const res = await fetch(
          `http://localhost:8000/chatconnect/api/users/${id}`
        );
        const userData = await res.json();
        setUser(userData.user);
        console.log(userData.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ width: '50%', minWidth: '20rem' }}>
        <CardContent>
          <Typography
            fontSize='2rem'
            textAlign='center'
            fontWeight='bold'
            color='green'
          >
            Your Profile
          </Typography>
          <Box
            margin={3}
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={3}
          >
            <Avatar sx={{ width: '70px', height: '70px' }} />
            <Typography>Email: {user.email}</Typography>
            <Typography>Name: {user.firstName}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate('/')}
            color='warning'
          >
            Back
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Profile;
