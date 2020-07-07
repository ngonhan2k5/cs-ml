// import {useState, useEffect} from 'react'


// function useFetchMovie(movieIds){
//     const [q, setQuery] = useState("batman");

//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
  
//     useEffect(() => {
//       setLoading(true);
//       setError(null);
//       setData(null);
//       const query = movieIds.map(movieId => `movieIds=${movieId}`).join('&')

//       fetch(`http://127.0.0.1:5000/api/movies?${query}`)
//         .then((resp) => resp)
//         .then((resp) => resp.json())
//         .then((response) => {
//           // if (response.Response === "False") {
//           //   setError(response.Error);
//           // } else 
//           //   setData(response);
//           // }
//           setLoading(false);
//         })
//         .catch(({ message }) => {
//           setError(message);
//           setLoading(false);
//         });
//     }, [q]);

//     return [data, loading, error]
// }

// export default useFetchMovie;