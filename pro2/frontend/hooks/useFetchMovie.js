import { useState, useEffect } from "react";
import { getMovieByMovieId } from "../services/movieService";

function useFetchMovie({ movieId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await getMovieByMovieId(movieId);
        setData(result.data);
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

export default useFetchMovie;
