import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { logout } from '../features/authSlice';
import { useProfileUserQuery } from '../services/authApi';
import { useChangeUserMutation } from '../services/authApi';
import { setUser } from '../features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
};

function Profile() {
  const [isDisplay, setDisplay] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);

  const { firstName, lastName } = formValue;

  const [changeUser] = useChangeUserMutation();

  const user = JSON.parse(window.localStorage.getItem('user'));

  const { data, error } = useProfileUserQuery(user.token);
  if (error) console.log(error);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (isDisplay) setDisplay(false);
    else setDisplay(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    console.log('User Successfully Logout!');
  };

  const handleSave = async () => {
    setLoading(true);
    initialState.firstName = formValue.firstName;
    initialState.lastName = formValue.lastName;
    console.log(initialState.firstName);
    const body = {
      token: user.token,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };
    const res = await changeUser(body);
    console.log(res);
    console.log('User Saved Successfully!');
    setLoading(false);
    alert('User Saved Successfully');
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      setUser({
        firstName: data?.body?.firstName,
        lastName: data?.body?.lastName,
      })
    );
    initialState.firstName = data?.body?.firstName;
    initialState.lastName = data?.body?.lastName;
    setLoading(false);
    //eslint-disable-next-line
  }, [data]);

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
          <a className="main-nav-item" href="/profile">
            <i className="fa fa-user-circle" />
            {isLoading ? <span>Loading...</span> : initialState.firstName}
          </a>
          <button className="main-nav-item" onClick={() => handleLogout()}>
            <i className="fa fa-sign-out" />
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {console.log(initialState.firstName)}
            {isLoading ? null : initialState.firstName}{' '}
            {isLoading ? null : initialState.lastName}
          </h1>
          {isDisplay && (
            <div className="edit-div">
              <input
                className="edit-input"
                type="text"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={handleChange}
              />
              <input
                className="edit-input"
                type="text"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
          )}
          {isDisplay ? (
            <button className="edit-button margin-right" onClick={handleSave}>
              Save
            </button>
          ) : null}

          <button className="edit-button" onClick={handleClick}>
            {isDisplay ? 'Close' : 'Edit Name'}
          </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default Profile;
