import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const defaultTheme = createTheme();

const registerUser = async (data) => {
  try {
    const res = await fetch('http://localhost:8000/chatconnect/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const user = await res.json();
      return user;
    } else {
      throw new Error('Failed to register user');
    }
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      profilePicture: await getBase64(data.get('profilePicture')),
    };
    try {
      console.log(userData);
      const user = await registerUser(userData);
      console.log('User registered successfully:', user);
      navigate('/signIn');
    } catch (error) {
      setError(error.message);
      console.error('Error registering user:', error.message);
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container
          component='main'
          maxWidth='xs'
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#fff' }}>
              <LockOutlinedIcon color='primary' />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
            >
              Sign up
            </Typography>
            <Box
              component='form'
              onSubmit={(event) => handleSubmit(event)}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    type='email'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    type='file'
                    accept='image/*'
                    fullWidth
                    id='profilePicture'
                    name='profilePicture'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  {error && <Alert severity='error'>{error}</Alert>}
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid
                item
                textAlign='right'
              >
                <Link to='/signIn'>Already have an account? Sign in</Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
