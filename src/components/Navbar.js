import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #282c34;
  color: white;
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/convert">Convert</Link>
    </Nav>
  );
};

export default Navbar;
