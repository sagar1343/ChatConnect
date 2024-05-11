import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'signIn', element: <SignInPage /> },
  { path: 'signUp', element: <SignUpPage /> },
]);

export default router;
