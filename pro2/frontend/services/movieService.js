import axios from "axios";
const API_KEY = "ce762116";

export async function getMoviesByMovieIds(movieIds) {
  const movieIdsQuery = movieIds
    .map(movieId => `movieIds=${movieId}`)
    .join("&");

  const movies = await axios.get(
    `http://${process.env.host}:5000/api/movies?${movieIdsQuery}`
  );

  const imbdIds = movies.data.map((movie) => movie.imdb_id);
  const moviesIds = movies.data.map((movie) => movie.id);
  const calls = imbdIds.map((imbdId) =>
    axios.get(`http://www.omdbapi.com/?i=${imbdId}&apikey=${API_KEY}`)
  );
  const results = await Promise.all(calls);

  const dataList = results.map((result) => result.data);
    
  for(let i = 0; i < dataList.length; i++){
    dataList[i]['id'] = movies.data[i]['id'];
    dataList[i]['overview'] =  movies.data[i]['overview'];
    dataList[i]['vote_average'] =  movies.data[i]['vote_average'];
    dataList[i]['vote_count'] =  movies.data[i]['vote_count'];
  }

  return dataList;
}

export async function getMovieByMovieId(movieId) {

    const movie = await axios.get(`http://${process.env.host}:5000/api/movies/${movieId}`);

    const result = await axios.get(`http://www.omdbapi.com/?i=${movie.data.imdb_id}&apikey=${API_KEY}`)  
    result.data.id = movie.data.id
    result.data.overview = movie.data.overview
    result.data.vote_average = movie.data.vote_average
    result.data.vote_count = movie.data.vote_count
    return result.data;
  }
  
