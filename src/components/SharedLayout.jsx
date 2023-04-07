import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const SharedLayout = () => {
  let activeClassName = {
    color: 'red',
  };

  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        color: '#010101',
      }}
    >
      <header>
        <nav>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
          >
            Movies
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
