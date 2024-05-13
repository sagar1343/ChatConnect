import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Playground from './components/Playground';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'signIn', element: <SignInPage /> },
  { path: 'signUp', element: <SignUpPage /> },
  { path: 'play', element: <Playground /> },
]);

export default router;
