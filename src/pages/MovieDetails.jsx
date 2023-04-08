import React, { useState, useEffect, Suspense } from 'react';
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { fetchMovie } from '../components/api';
import { TiArrowLeftThick } from 'react-icons/ti';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  // console.log(movieId);

  let activeClassName = {
    color: 'red',
  };

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    fetchMovie(movieId).then(movieData => {
      setMovie(movieData);
    });
  }, [movieId]);

  // console.log(movie);

  if (!movie) {
    return <b>Loading...</b>;
  }

  return (
    <>
      <button onClick={handleClick} className={css.go_back}>
        <TiArrowLeftThick />
        Go back
      </button>
      <div className={css.movie_container}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
              : 'https://via.placeholder.com/185x278.png?text=No+Image'
          }
          alt="movie poster"
        />
        <div className={css.movie_info}>
          <h2>{movie.title}</h2>
          <p>User score: {(movie.vote_average * 10).toFixed()}%</p>
          <h3>Overview</h3>
          {!movie.overview ? (
            <p>No overview information found.</p>
          ) : (
            <p>{movie.overview}</p>
          )}

          <h3>Genres</h3>
          {movie.genres.length === 0 ? (
            <p>No information on genres was found.</p>
          ) : (
            <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
          )}
        </div>
        <div className={css.movie_info}>
          <b>Additional information</b>
          <ul>
            <li>
              <NavLink
                to="cast"
                style={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
                state={location.state}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                style={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
                state={location.state}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
