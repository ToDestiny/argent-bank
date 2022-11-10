import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const [isSubmit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const { email, password } = formValue;

  const navigate = useNavigate();

  const [loginUser, { data, isSuccess, isError, error }] =
    useLoginUserMutation();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setSubmit(true);
    if (email && password) {
      await loginUser({ email, password });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('User Logged Successfully');
      dispatch(setUserToken({ token: data?.body?.token }));
      navigate('/profile');
    }
    if (isError) {
      alert('An error occured during login. Please check your inputs.');
      console.log(error);
    }
    //eslint-disable-next-line
  }, [isSuccess, isError]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Login</h1>
          <div className="input-wrapper">
            <label>Username</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {isSubmit && !email && <span>This is required.</span>}
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {isSubmit && !password && <span>This is required.</span>}
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          <button
            className="sign-in-button"
            type="button"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          {isError && <span>Sorry, Login failed!</span>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
