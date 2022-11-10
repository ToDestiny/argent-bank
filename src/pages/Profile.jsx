import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useProfileUserQuery } from '../services/authApi';
import { useChangeUserMutation } from '../services/authApi';
import { setUser } from '../features/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const initialState = {
  firstName: '',
  lastName: '',
};

function Profile() {
  const [isDisplay, setDisplay] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(initialState);

  const { firstName, lastName } = formValue;

  const [changeUser] = useChangeUserMutation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userFirstName = useSelector((state) => state.auth.firstName);
  const userLastName = useSelector((state) => state.auth.lastName);
  const token = useSelector((state) => state.auth.token);

  const { data, error } = useProfileUserQuery(token);
  if (error) console.log(error);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (isDisplay) setDisplay(false);
    else setDisplay(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const body = {
      token: token,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };
    const res = await changeUser(body);
    console.log(res);
    console.log('User Saved Successfully!');
    dispatch(
      setUser({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
      })
    );
    setLoading(false);
    alert('User Saved Successfully');
  };

  useEffect(() => {
    setLoading(true);
    if (data && !isLogin)
      dispatch(
        setUser({
          firstName: data?.body?.firstName,
          lastName: data?.body?.lastName,
        })
      );
    setLoading(false);
    //eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {isLoading ? null : userFirstName} {isLoading ? null : userLastName}
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
      <Footer />
    </div>
  );
}

export default Profile;
