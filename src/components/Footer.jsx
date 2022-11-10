import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  bottom: 0;
`;

function Footer() {
  return (
    <Container className="footer">
      <p className="footer-text">Copyright 2020 Argent Bank</p>
    </Container>
  );
}

export default Footer;
