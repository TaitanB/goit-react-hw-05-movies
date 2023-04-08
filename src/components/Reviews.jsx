import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieReviews } from './api.js';
import css from '../pages/MovieDetails.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(movie => {
      // console.log(`fetchMovieCredits ${movie.results}`);
      setReviews(movie.results);
    });
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }
  return (
    <>
      <ul className={css.review}>
        {reviews.map(review => (
          <li key={review.id}>
            <b>{review.author}</b>
            <p>{review.content}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
