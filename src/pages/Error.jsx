import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import styled from 'styled-components';

const ErrorContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 50px;
`;

function Error() {
  return (
    <div>
      <title>Argent Bank - Home Page</title>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./sign-in.html">
            <i className="fa fa-user-circle" />
            Login
          </a>
        </div>
      </nav>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <ErrorContent>
            <h1>
              404
              <br />
              Page not found
            </h1>
          </ErrorContent>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default Error;
