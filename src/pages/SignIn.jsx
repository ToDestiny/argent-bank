import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
// import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { userLoginUserMutation } from '../services/authApi';

const initialState = {
  firstName: '',
  password: '',
};

function SignIn() {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, password } = formValue;
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     password: '',
  //   },
  // });

  const [loginUser, { data, isSuccess, isError, error }] =
    userLoginUserMutation();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (firstName && password) {
      await loginUser({ firstName, password });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('User logged successfully');
      // navigate('/user/profile');
    }
  }, [isSuccess]);

  //console.log(errors);

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
          {/* <form onSubmit={handleSubmit(handleLogin())}> */}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={handleChange}
              // {...register('firstName', { required: 'This is required.' })}
            />
            {/* {errors.firstName?.message && <span>This is required.</span>} */}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              // {...register('password', {
              //   required: 'This is required.',
              //   minLength: {
              //     value: 4,
              //     message: 'Min length is 4',
              //   },
              // })}
            />
            {/* {errors.password?.message && <span>This is required.</span>} */}
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            type="button"
            value="Sign In"
            onClick={() => handleLogin()}
          />
          {/* </form> */}
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignIn;
