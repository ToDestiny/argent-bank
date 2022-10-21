import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { logout } from '../features/authSlice';
import { useProfileUserQuery } from '../services/authApi';
import { useChangeUserMutation } from '../services/authApi';

const initialState = {
  firstName: '',
  lastName: '',
};

function Profile() {
  const [isDisplay, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const [saveValue, setSaveValue] = useState(initialState);

  const { firstNameData, lastNameData } = formValue;
  const { token, firstName, lastName } = formValue;

  const [
    changeUser,
    { changeData, isChangeSuccess, isChangeError, errorChangeData },
  ] = useChangeUserMutation();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(firstNameData);
  };

  const user = JSON.parse(window.localStorage.getItem('user'));
  const { data, error } = useProfileUserQuery(user.token);
  if (error) console.log(error);
  saveValue.token = user.token;
  saveValue.firstName = data?.body?.firstName;
  saveValue.lastName = data?.body?.lastName;

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
    console.log(token, firstNameData, lastNameData);
    const res = await changeUser({ token, firstName, lastName });
    initialState.firstName = firstNameData;
    initialState.lastName = lastNameData;
    console.log(res);
    console.log('User Saved Successfully!');
    console.log(changeData);
  };

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
            {initialState.firstName}
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
            {initialState.firstName} {initialState.lastName}
          </h1>
          {isDisplay && (
            <div className="edit-div">
              <input
                className="edit-input"
                type="text"
                id="firstNameData"
                value={firstNameData}
                name="firstNameData"
                onChange={handleChange}
              />
              <input
                className="edit-input"
                type="text"
                id="lastNameData"
                value={lastNameData}
                name="lastNameData"
                onChange={handleChange}
              />
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
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
