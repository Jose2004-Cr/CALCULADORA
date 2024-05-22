import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  logo from "../img/Header.png"

function Nav() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="animate__animated animate__fadeInDown justify-center w-full mx-auto bg-[#332ff6] mb-8 lg:rounded-b-full shadow-lg">
      <div className="flex flex-col w-full px-10 mx-auto py-9 md:px-12 md:items-center md:justify-between md:flex-row lg:px-20">
        <div className="flex flex-row items-center justify-between text-black">
          <a className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-black" href="/">
            <img src={logo} className='w-16'></img>
            <h1 className='text-4xl text-white'>CamargoCalc</h1>
          </a>
          <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path className={open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path className={!open ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className={open ?'flex flex-col items-center flex-grow gap-8 p-4 px-5 text-lg font-medium text-white md:px-0 md:pb-0 md:flex md:justify-end md:flex-row lg:p-0 md:mt-0' : 'hidden'} >
          <Link className={`hover:text-gray-100 hover:scale-105 transition-all ease-in-out delay-75  focus:outline-none ${location.pathname === '/calculadoraIntegral' ? 'transition-all ease-in-out delay-75 hover:scale-105 border-b-2 border-white' : ''}`} to="/calculadoraIntegral">Jorge Boole</Link>
          <Link className={`hover:text-gray-100 hover:scale-105 transition-all ease-in-out delay-75 focus:outline-none ${location.pathname === '/simpson_1-3' ? 'transition-all ease-in-out delay-75 border-b-2 border-white' : ''}`} to="/simpson_1-3">Simpson 1/3</Link>
          <Link className={`hover:text-gray-100 hover:scale-105 transition-all ease-in-out delay-75 focus:outline-none ${location.pathname === '/simpsonabierto' ? 'transition-all ease-in-out delay-75 border-b-2 border-white' : ''}`} to="/simpsonabierto">Simpson abierto</Link>
          <Link className={`hover:text-gray-100 hover:scale-105 transition-all ease-in-out delay-75 focus:outline-none ${location.pathname === '/sipson3_8' ? 'transition-all ease-in-out delay-75 border-b-2 border-white' : ''}`} to="/sipson3_8">Simpson 3/8</Link>
          <Link className={`hover:text-gray-100 hover:scale-105 transition-all ease-in-out delay-75 focus:outline-none ${location.pathname === '/trapezoidal' ? 'transition-all ease-in-out delay-75 border-b-2 border-white' : ''}`} to="/trapezoidal">Trapezoidal</Link>
        </nav>
      </div>
    </div>
  );
}

export default Nav;

