import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      password: '',
    },
  });

  console.log(errors);

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
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle" />
            Sign In
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Sign Up</h1>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'This is required.' })}
              />
              {errors.firstName?.message && <span>This is required.</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'This is required.' })}
              />
              {errors.lastName?.message && <span>This is required.</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...register('email', { required: 'This is required.' })}
              />
              {errors.lastName?.message && <span>This is required.</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'This is required.',
                  minLength: {
                    value: 4,
                    message: 'Min length is 4',
                  },
                })}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'This is required.',
                })}
              />
              {errors.password?.message && <span>This is required.</span>}
            </div>
            <input class="sign-in-button" type="submit" value="Register" />
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default SignUp;
