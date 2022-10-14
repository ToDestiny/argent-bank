import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const initialState = {
  email: '',
  password: '',
};

function SignIn() {
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
      console.log('User logged successfully');
      console.log(data.body.token);
      dispatch(setUser({ token: data.body.token }));
      navigate('/user');
    }
    //eslint-disable-next-line
  }, [isSuccess]);

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/sign-up">
            <i className="fa fa-user-circle" />
            Sign Up
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Sign In</h1>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="password">Password</label>
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
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            type="button"
            onClick={() => handleLogin()}
          >
            Sign In
          </button>
          {isError && <span>Sorry, Login failed!</span>}
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignIn;
