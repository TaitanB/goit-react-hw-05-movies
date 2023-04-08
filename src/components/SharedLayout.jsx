import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';

import css from './SharedLayout.module.css';

const SharedLayout = () => {
  let activeClassName = {
    color: 'red',
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink
            to="/"
            className={css.navlink}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={css.navlink}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            <MdLocalMovies />
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
