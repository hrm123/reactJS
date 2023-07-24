
import { useEffect, useState } from 'react';
import { Card } from './card';

export const Section = ({genre }) => {

    
  const [movies, setMovies] = useState(null)


  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8888/.netlify/functions/getMovies',{
        method: "POST",
        body: JSON.stringify({genre})
    })
    const responseBody = await response.json()
    setMovies(responseBody.data.movies_by_genre.values)
  }

  useEffect(() => {
    fetchMovies()
  },[])


    return (<><div>
        {genre}
    </div>
    {
        movies && 
            (<div className="movie-section">
                {movies.map((movie, index) => (
                    <Card movie={movie} key={index} />
                ))}
            </div>)
    }
    </>)
}