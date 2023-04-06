import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from './api.js';

export const Cast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(movie => {
      console.log(`fetchMovieCredits ${movie.cast}`);
      setMovieCast(movie.cast);
    });
  }, [movieId]);

  return (
    <ul>
      {movieCast.map(cast => (
        <li key={cast.id}>
          <img
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w92${cast.profile_path}`
                : 'https://via.placeholder.com/92x138.png?text=No+Image'
            }
            alt="profile_path"
          />
          <p>{cast.original_name}</p>
          <p>Character: {cast.character}</p>
        </li>
      ))}
    </ul>
  );
};
