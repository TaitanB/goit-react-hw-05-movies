import React, { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { fetchMovie } from '../components/api';

export const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  console.log(movieId);

  let activeClassName = {
    color: 'red',
  };

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    fetchMovie(movieId).then(movieData => {
      setMovie(movieData);
    });
  }, [movieId]);

  console.log(movie);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={handleClick}>Go back</button>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt="movie poster"
        />
        <h2>{movie.title}</h2>
        <p>User score: {(movie.vote_average * 10).toFixed()}%</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>

        <p>Additional information</p>
        <ul>
          <li>
            <NavLink
              to="cast"
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
              state={location.state}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
              state={location.state}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    </>
  );
};
