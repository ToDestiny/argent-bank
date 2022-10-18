import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import LoadingToRedirect from './LoadingToRedirect';

function PrivateRoute({ children }) {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
}

export default PrivateRoute;
