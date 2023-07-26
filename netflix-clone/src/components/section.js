
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
        setMovies(response.data.movies_by_genre.values)
        setPageState(response.data.movies_by_genre.pageState)
      }
      else{
        console.log('error=', response)
      }

    })
  },[fetchNext])


    return (<><div className="genre" id={genre}>
        {genre}
    </div>
    {
        movies && 
            (<div className="movie-section">
                {movies.map((movie, index) => {
            return (index==0 && genre=="Dramas") ? <Card key={index} movie={movie} focus={true} />
            : <Card key={index} movie={movie} focus={false}  />
            })}
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