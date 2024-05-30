import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/Header.png';
import backgroundImage from '../img/sss.png';
import './styles.css';

function Nav() {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className={`py-4 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } transition-colors duration-500`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
          <span className="ml-2 text-xl font-bold">CamargoCalc</span>
        </Link>

        <div className="flex items-center">
          <button
            className={`block md:hidden focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            onClick={toggleMenu}
          >
            {open ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <button
            className={`ml-4 hidden md:block focus:outline-none ${
              isDarkMode
                ? 'text-white hover:bg-gray-800 transition-colors duration-300'
                : 'text-gray-900 hover:bg-gray-200 transition-colors duration-300'
            } px-4 py-2 rounded-md`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
      </div>

      <div
        className={`${
          open ? 'block' : 'hidden'
        } md:block md:flex md:items-center w-full md:w-auto`}
      >
        <div className="text-lg md:flex-grow md:flex md:justify-end">
          <NavLink to="/calculadoraIntegral" isDarkMode={isDarkMode}>Jorge Boole</NavLink>
          <NavLink to="/simpson_1-3" isDarkMode={isDarkMode}>Simpson 1/3</NavLink>
          <NavLink to="/simpsonabierto" isDarkMode={isDarkMode}>Simpson abierto</NavLink>
          <NavLink to="/sipson3_8" isDarkMode={isDarkMode}>Simpson 3/8</NavLink>
          <NavLink to="/trapezoidal" isDarkMode={isDarkMode}>Trapezoidal</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, isDarkMode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block mt-4 md:inline-block md:mt-0 ${
        isDarkMode ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'
      } mr-4 ${isActive ? 'border-b-2 border-white' : ''}`}
    >
      {children}
    </Link>
  );
}

export default Nav;
