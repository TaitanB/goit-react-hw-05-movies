const API_KEY = '1ecd20ff6e4c95041ce45cabe64037fc';
const BASE_API = 'https://api.themoviedb.org/3/';

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_API}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    // console.error(`ERROR: ${error}`);
    alert('Щось пішло не так... Будь ласка, спробуйте ще раз пізніше.');
    throw error;
  }
};

export const fetchSearchMovies = async query => {
  try {
    const response = await fetch(
      `${BASE_API}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    // console.error(`ERROR: ${error}`);
    alert('Щось пішло не так... Будь ласка, спробуйте ще раз пізніше.');
    throw error;
  }
};

export const fetchMovie = async movie_id => {
  try {
    const response = await fetch(
      `${BASE_API}/movie/${movie_id}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error(`ERROR: ${error}`);
    alert('Щось пішло не так... Будь ласка, спробуйте ще раз пізніше.');
    throw error;
  }
};

export const fetchMovieCredits = async movie_id => {
  try {
    const response = await fetch(
      `${BASE_API}/movie/${movie_id}/credits?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error(`ERROR: ${error}`);
    alert('Щось пішло не так... Будь ласка, спробуйте ще раз пізніше.');
    throw error;
  }
};

export const fetchMovieReviews = async movie_id => {
  try {
    const response = await fetch(
      `${BASE_API}/movie/${movie_id}/reviews?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error(error);
    alert('Щось пішло не так... Будь ласка, спробуйте ще раз пізніше.');
    throw error;
  }
};
