import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { fetchMovie } from '../components/api';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  console.log(location.state);
  const backLinkHref = location.state?.from ?? `/movies`;

  console.log(movieId);
  const [movie, setMovie] = useState(null);

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
      <Link to={backLinkHref}>Go back</Link>
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
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};
