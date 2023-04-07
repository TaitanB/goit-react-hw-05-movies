import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../components/api';
import { MoviesList } from '../components/MoviesList';

export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!searchQuery) {
      console.log('Поле пошуку порожнє');
      return;
    }

    const fetchsearchQuery = () => {
      fetchSearchMovies(searchQuery).then(movies => {
        console.log(`fetchSearchMovies ${movies}`);
        if (movies.length !== 0) {
          setMovies(movies);
        } else {
          console.log('Нічого не знайдено');
          alert('Нічого не знайдено');
        }
      });
    };
    fetchsearchQuery();
    setMovies([]);
  }, [searchQuery]);

  function onSubmit(event) {
    event.preventDefault();

    if (query !== '') {
      console.log('Запит валідний');
      console.log(query);
      setSearchParams({ query: `${query}` });
    } else {
      console.log('Запит не валідний');
      alert('Please enter a valid value.');
      return;
    }
  }

  const handleChange = event => {
    event.preventDefault();
    setQuery(event.target.value.trim());
  };

  return (
    <>
      <form onSubmit={onSubmit}>
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

      <MoviesList movies={movies} prevLocation={location} />
    </>
  );
};
