import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from './api.js';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(movie => {
      console.log(`fetchMovieCredits ${movie.results}`);
      setReviews(movie.results);
    });
  }, [movieId]);

  if (!reviews) {
    return <p>We don't have any reviews for this movie.</p>;
  }
  return (
    <>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
