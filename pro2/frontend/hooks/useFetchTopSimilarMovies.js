import { useState, useEffect } from "react";
import axios from "axios";
import { getMoviesByMovieIds } from "../services/movieService";

function useFetchTopSimilarMovies({ movieId }) {

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
          `http://${process.env.host}:5000/api/top-ten-similar/${movieId}`
        );

        const dataList = await getMoviesByMovieIds(mlResult.data["top-ten"]);

        setData(dataList);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setLoading(false);
      }
    })();
  }, [movieId]);

  return [data, loading, error];
}

export default useFetchTopSimilarMovies;
