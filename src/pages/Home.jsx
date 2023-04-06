import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../components/api';
import { MoviesList } from '../components/MoviesList';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setTrendingMovies(trendingMovies);
    };

    getTrendingMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <MoviesList movies={trendingMovies} />
    </>
  );
};
