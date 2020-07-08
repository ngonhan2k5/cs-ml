import { useState, useEffect } from "react";
import axios from "axios";
import { getMovieByMovieId } from "../services/movieService";

function useFetchEstimatedRating({ movieId, userId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    if (!userId) return;

    (async function () {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await axios.get(
          `http://127.0.0.1:5000/api/estimated_rate/${userId}/${movieId}`
        );

        setData(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setLoading(false);
      }
    })();
  }, [movieId, userId]);

  return [data, loading, error];
}

export default useFetchEstimatedRating;
