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
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
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
            <Typography>Email-</Typography>
            <Typography>Name-</Typography>
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
