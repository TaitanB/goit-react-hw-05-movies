import React, { useState, useEffect, Suspense } from 'react';
import { useLocation, useSearchParams, Outlet } from 'react-router-dom';

import { fetchSearchMovies } from '../components/api';
import MoviesList from '../components/MoviesList';
import css from '../components/SharedLayout.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!searchQuery) {
      // console.log('Поле пошуку порожнє');
      return;
    }

    const fetchsearchQuery = () => {
      fetchSearchMovies(searchQuery).then(movies => {
        // console.log(`fetchSearchMovies ${movies}`);
        if (movies.length !== 0) {
          setMovies(movies);
        } else {
          // console.log('Нічого не знайдено');
          alert('Nothing found.');
          setQuery('');
        }
      });
    };
    fetchsearchQuery();
    setMovies([]);
  }, [searchQuery]);

  function onSubmit(event) {
    event.preventDefault();

    if (query !== '') {
      // console.log('Запит валідний');
      // console.log(query);
      setSearchParams({ query: `${query}` });
    } else {
      // console.log('Запит не валідний');
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
      <form onSubmit={onSubmit} className={css.form}>
        <label>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search..."
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className={css.btn}>
            Search
          </button>
        </label>
      </form>
      <Suspense fallback={<b>Loading...</b>}>
        {movies.length === 0 ? (
          <b>There are no movies here yet.</b>
        ) : (
          <MoviesList movies={movies} prevLocation={location} />
        )}
      </Suspense>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Movies;
