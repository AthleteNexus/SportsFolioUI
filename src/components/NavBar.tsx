import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="font-bold text-2xl">SportsFolio</div>
      <ul className="flex gap-6 m-0 p-0 list-none">
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`hover:text-blue-400 transition ${
                location.pathname === item.path ? 'text-blue-400 font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;