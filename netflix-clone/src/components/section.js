
import { memo, useEffect, useState } from 'react';
import { Card } from './card';

export const SectionClass = ({genre }) => {

    
  const [movies, setMovies] = useState(null)
  const [pageState, setPageState] = useState(null)
  const [fetchNext, setFetchNext] = useState(1)

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8888/.netlify/functions/getMovies',{
        method: "POST",
        body: JSON.stringify({genre, pageState: pageState})
    })
    const responseBody = await response.json()
    return responseBody
    
  }

  useEffect(() => {
    fetchMovies().then(response =>{
      if(response.data){
        console.log('data=', response)
        setMovies(response.data.movies_by_genre.values)
        setPageState(response.data.movies_by_genre.pageState)
      }
      else{
        console.log('error=', response)
      }

    })
  },[fetchNext])


    return (<><div className="genre">
        {genre}
    </div>
    {
        movies && 
            (<div className="movie-section">
                {movies.map((movie, index) => (
                    <Card movie={movie} key={index} />
                ))}
                <div
                  className="more-button"
                  onClick={() => {
                    setPageState(pageState)
                    setFetchNext(fetchNext+1)
                  }}
                >
                  <i className="fa fa-angle-right"></i>
                </div>
            </div>)
    }
    </>)
}

export const Section = memo(SectionClass)