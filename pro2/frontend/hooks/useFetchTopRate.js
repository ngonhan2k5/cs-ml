import { useState, useEffect } from "react";
import axios from "axios";
import {getMoviesByMovieIds} from "../services/movieService"

function useFetchTopRateMovies({ userId }) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      setError(null);
      setData(null);
      try {

        const mlResult = await axios.get(
          `http://${process.env.host}:5000/api/top-ten-rate?user_id=${userId}`
        );
        const movieIds = mlResult.data
          .map((obj) => obj.movie_id);

  
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

export default useFetchTopRateMovies;
