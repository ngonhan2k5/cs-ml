import {useState, useEffect} from 'react'

const API_KEY = "ce762116";

function useFetchMovie(){
    const [q, setQuery] = useState("batman");

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      setError(null);
      setData(null);
  
      fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}&plot=full`)
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((response) => {
          if (response.Response === "False") {
            setError(response.Error);
          } else {
            console.log("response.Search");
            console.log(response.Search);
            setData(response.Search);
          }
  
          setLoading(false);
        })
        .catch(({ message }) => {
          setError(message);
          setLoading(false);
        });
    }, [q]);

    return [data, loading, error]
}

export default useFetchMovie;