import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import User from './pages/User';
import SignUp from './pages/SignUp';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './features/authSlice';

function App() {
  // const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem('user'));

  //  useEffect(() => {
  //   dispatch(setUser());
  //   eslint-disable-next-line
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
