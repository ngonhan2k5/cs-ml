import axios from "axios";
const API_KEY = "ce762116";

export async function getMoviesByMovieIds(movieIds) {
  const movieIdsQuery = movieIds
    .map(movieId => `movieIds=${movieId}`)
    .join("&");

  const movies = await axios.get(
    `http://${process.env.host}:5000/api/movies?${movieIdsQuery}`
  );
  const localMovies = []
  movies.data.forEach(movie => {
    const localMovie = localStorage.getItem(movie.imdb_id);
    if(localMovie != null) {
      localMovies.push(JSON.parse(localMovie))
    }
  });
  movies.data = movies.data.filter((movie) => localStorage.getItem(movie.imdb_id) == null)
  const imbdIds = movies.data.map((movie) => movie.imdb_id);

  const calls = imbdIds.map((imbdId) =>
    axios.get(`http://www.omdbapi.com/?i=${imbdId}&apikey=${API_KEY}`)
  );
  const results = await Promise.all(calls);

  const dataList = results.map((result) => result.data);
    
  for(let i = 0; i < dataList.length; i++){
    const movie = dataList[i];
    movie['id'] = movies.data[i]['id'];
    movie['overview'] =  movies.data[i]['overview'];
    movie['vote_average'] =  movies.data[i]['vote_average'];
    movie['vote_count'] =  movies.data[i]['vote_count'];
    localStorage.setItem(movie.imdbID, JSON.stringify(movie));
  }

  return dataList.concat(localMovies);
}

export async function getMovieByMovieId(movieId) {

    const movie = await axios.get(`http://${process.env.host}:5000/api/movies/${movieId}`);

    let localMovie = localStorage.getItem(movie.data.imdb_id);
    if(localMovie == null) {
      const result = await axios.get(`http://www.omdbapi.com/?i=${movie.data.imdb_id}&apikey=${API_KEY}`)  
      localMovie = result.data;
      localMovie.id = movie.data.id
      localMovie.overview = movie.data.overview
      localMovie.vote_average = movie.data.vote_average
      localMovie.vote_count = movie.data.vote_count
      localStorage.setItem(localMovie.imdbID, JSON.stringify(localMovie));
    } else {
      localMovie = JSON.parse(localMovie)
    }

    return localMovie;
  }
  
