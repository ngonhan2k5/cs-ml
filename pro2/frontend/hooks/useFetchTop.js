import { useState, useEffect } from "react";
import axios from "axios";
import { getMoviesByMovieIds } from "../services/movieService";

function useFetchTopMovies() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    (async function () {
      console.log("11" + 11);
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const mlResult = await axios.get(
          `http://${process.env.host}:5000/api/top-ten`
        );
        const movieIds = mlResult.data.map((obj) => obj.id);

        const dataList = await getMoviesByMovieIds(movieIds);
          console.log(mlResult)
        setData(dataList);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setLoading(false);
      }
    })();
  }, []);

  return [data, loading, error];
}

export default useFetchTopMovies;
