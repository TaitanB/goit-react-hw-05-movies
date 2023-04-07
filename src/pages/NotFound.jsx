import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <p>
      Page is not found :( Go to <Link to="/">Home</Link>
    </p>
  );
};
