import React from 'react'
import { memo, useEffect, useState } from 'react';


    
const fetchMovies = async () => {
    const response = await fetch('http://localhost:8888/.netlify/functions/getMovies',{
        method: "POST",
        body: JSON.stringify({genre: "Sci-Fi", pageState: null})
    })
    const responseBody = await response.json()
    return responseBody
    
  }


const HeroSectionClass = () => {

    const [movie, setMovie] = useState(null)

    useEffect(() => {
        fetchMovies().then(response =>{
        if(response.data){
            const movies = response.data.movies_by_genre.values
        console.log({indx: Math.random() % movies.length, movies})
            setMovie(movies[Math.floor(Math.random() * 100) % movies.length])
        }
        else{
            console.log('error=', response)
        }

        })
    },[fetchMovies])

    console.log('movie', movie)
    return (
        <>
            {movie && (
                <div className="hero">
                    <video className="hero-video" muted controls autoPlay={true} loop>
                        <source src={movie.thumbnail} type="video/mp4" />
                    </video>
                    <div className="info-section">
                        <h3 className="hero-blurb">{movie.synopsis}</h3>
                        <div className="button-section">
                        <div className="button play">
                            <span>
                            <i className="fa fa-play"></i>
                            </span>
                            Play
                        </div>
                        <div className="button more">
                            <span>
                            <i className="fa fa-info-circle"></i>
                            </span>
                            More info
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default React.memo(HeroSectionClass)