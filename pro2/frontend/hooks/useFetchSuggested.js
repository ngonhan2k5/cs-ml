import { useState, useEffect } from "react";
import axios from "axios";
import {getMoviesByMovieIds} from "../services/movieService"

function useFetchSuggestedMovies({ userId, movieTitle }) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  movieTitle = encodeURI(movieTitle)
  useEffect(() => {
    (async function () {
      setLoading(true);
      setError(null);
      setData(null);
      try {

        const mlResult = await axios.get(
          `http://${process.env.host}:5000/api/suggested_movies/${userId}/${movieTitle}`
        );
        const movieIds = mlResult.data
          .map((obj) => obj.id);

  
        const dataList = await getMoviesByMovieIds(movieIds);

        setData(dataList);
        setLoading(false);
      } catch (e) {
        console.log(e)
        setError(e);
        setLoading(false);
      }
    })();
  }, [userId]);

  return [data, loading, error];
}

export default useFetchSuggestedMovies;
