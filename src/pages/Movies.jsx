import React, { useState } from 'react';
import { fetchSearchMovies } from '../components/api';
import { MoviesList } from '../components/MoviesList';

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = event => {
    event.preventDefault();

    setQuery(() => {
      console.log('Ввели пошуковий запит в інпут');

      return event.target.value;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() !== '') {
      console.log('Запит валідний');

      fetchSearchMovies(query).then(movies => {
        console.log(`fetchSearchMovies ${movies}`);
        if (movies.length !== 0) {
          setMovies(movies);
        } else {
          console.log('Нічого не знайдено');
          alert('Нічого не знайдено');
        }
      });
    } else {
      console.log('Запит не валідний');
      alert('Please enter a valid value.');
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search..."
            value={query}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>

      <MoviesList movies={movies} />
    </>
  );
};
