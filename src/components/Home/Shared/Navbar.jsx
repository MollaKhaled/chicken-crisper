import React from 'react';
import { Link } from 'react-router-dom';
import UseCart from '../../../hooks/UseCart';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const [cart] = UseCart();
  const navItems = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/signup'>Register</Link></li>
    <li><Link to='/menu'>Our Menu</Link></li>
    <li><Link to='/order/salad'>Order Food</Link></li>
    <li>
      <button className='btn gap-2'>
        <FaShoppingCart></FaShoppingCart>
        <div className='badge badge-secondary'>+{cart?.length}</div>
      </button>
    </li>
  </>
  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        {/* <Link to='/'><img className='w-32' src={logo} alt="" /></Link> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-warning">Admin</button>
      </div>
    </div>
  );
};

export default Navbar;