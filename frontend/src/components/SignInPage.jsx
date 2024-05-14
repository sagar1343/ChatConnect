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

const defaultTheme = createTheme();

const login = async (data) => {
  try {
    const res = await fetch('http://localhost:8000/chatconnect/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    console.error(error.message);
  }
};

export default function SignIn() {
  const [message, setMessage] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    const data = new FormData(event.currentTarget);
    const loginCredentials = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const authData = await login(loginCredentials);
    if (authData.message) {
      setMessage(authData.message);
    } else {
      localStorage.setItem('chatconnectID', authData.id);
      navigate('/');
    }
    console.log(authData);
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
              marginY: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
            >
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={(event) => handleSubmit(event)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                color='success'
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                color='success'
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <Typography
                align='center'
                color='red'
              >
                {message}
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='success'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid
                item
                textAlign='right'
              >
                <Link to='/signUp'>Don't have an account? Sign Up</Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
