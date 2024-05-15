import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';
import Playground from './components/Playground';

const router = createBrowserRouter([
  { path: 'home', element: <Home /> },
  { path: 'signIn', element: <SignInPage /> },
  { path: 'signUp', element: <SignUpPage /> },
  { path: 'profile', element: <Profile /> },
  { path: 'play', element: <Playground /> },
]);

export default router;
