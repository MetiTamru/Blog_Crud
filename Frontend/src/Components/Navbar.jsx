import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `text-white px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `text-white px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
          Add Blog
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
