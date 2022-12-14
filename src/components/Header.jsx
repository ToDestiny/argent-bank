import React from 'react';
import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  @media (min-width: 900px) {
    height: 3rem;
  }
  @media (max-width: 899px) {
    height: 5rem;
  }
  display: flex;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  @media (min-width: 900px) {
    flex-direction: row;
  }
  @media (max-width: 899px) {
    flex-direction: column;
  } ;
`;

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userFirstName = useSelector((state) => state.auth.firstName);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    alert('You successfully logged out.');
    console.log('User Successfully Logout!');
  };
  return (
    <Container className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <BtnWrapper>
        {isLogin ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle" />
              {userFirstName}
            </Link>
            <Link className="main-nav-item" onClick={() => handleLogout()}>
              <i className="fa fa-sign-out" />
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle" />
            Login
          </Link>
        )}

        <Link className="main-nav-item" to="/sign-up">
          <i className="fa fa-user-circle" />
          Sign Up
        </Link>
      </BtnWrapper>
    </Container>
  );
}

export default Header;
