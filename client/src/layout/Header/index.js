import React from 'react';
import { Link } from 'react-router-dom';
import brain from '../../assets/brain.svg';

const Header = () => {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="text-white">
            <img
              src={brain}
              style={{ width: '20px' }}
              className="mr-3"
              alt="movie brain"
            />
            Movie Brain
          </Link>
          <div>
            <Link className="mr-5 text-white" to="/">
              Home
            </Link>
            <Link className="text-white" to="/profile">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
