import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieCredits } from './api.js';
import css from '../pages/MovieDetails.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(movie => {
      // console.log(`fetchMovieCredits ${movie.cast}`);
      setMovieCast(movie.cast);
    });
  }, [movieId]);

  if (movieCast.length === 0) {
    return <p>No information about the cast was found.</p>;
  }

  return (
    <ul className={css.cast}>
      {movieCast.map(cast => (
        <li key={cast.id} className={css.cast_item}>
          <img
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w92${cast.profile_path}`
                : 'https://via.placeholder.com/92x138.png?text=No+Image'
            }
            alt="profile_path"
          />
          <b>{cast.original_name}</b>
          <p>Character: {cast.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
