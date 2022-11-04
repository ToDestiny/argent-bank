import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/authApi';
import Header from '../components/Header';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const [formValue, setFormValue] = useState(initialState);
  const [isSubmit, setSubmit] = useState(false);
  const [isErrorPassword, setErrorPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formValue;

  const navigate = useNavigate();

  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    let re =
      //eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setErrorPassword(false);
    if (password !== confirmPassword) {
      setSubmit(true);
      setErrorPassword(true);
      return;
    }
    if (!re.test(email)) {
      alert('You have entered an invalid email address!');
      setSubmit(true);
    }
    if (email && password && firstName && lastName) {
      const response = await registerUser({
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response.error);
      if (response.error) {
        alert(JSON.stringify(response.error.data.message));
        return;
      }
      setSubmit(true);
    } else {
      console.log(error);
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('You succesfully registered!');
      console.log('User Registered Successfully');
      navigate('/login');
    }
    if (isError) {
      alert('An error occured when registering. Please check your inputs.');
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
          <h1>Sign Up</h1>
          <div className="input-wrapper">
            <label>First Name</label>
            <input
              type="firstName"
              id="firstName"
              value={firstName}
              name="firstName"
              onChange={handleChange}
            />
            {isSubmit && !firstName && <span>This is required.</span>}
          </div>
          <div className="input-wrapper">
            <label>Last Name</label>
            <input
              type="lastName"
              id="lastName"
              value={lastName}
              name="lastName"
              onChange={handleChange}
            />
            {isSubmit && !lastName && <span>This is required.</span>}
          </div>
          <div className="input-wrapper">
            <label>Email</label>
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
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {isSubmit && !password && <span>This is required.</span>}
          </div>
          <div className="input-wrapper">
            <label>Confirm Password</label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {isSubmit && !confirmPassword && <span>This is required.</span>}
          </div>
          <button
            className="sign-in-button"
            type="button"
            onClick={() => handleSignup()}
          >
            Register
          </button>
          {isErrorPassword && <span>Your passwords don't match!</span>}
          {isError && <span>${error}</span>}
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignUp;
