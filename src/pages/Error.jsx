import '../App.css';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.footer`
  height: 85vh;
  margin-bottom: -3rem;
`;

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
      <Header />
      <Container>
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
      </Container>
      <Footer />
    </div>
  );
}

export default Error;
