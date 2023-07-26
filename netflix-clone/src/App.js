import { memo, useEffect, useRef, useState } from 'react';
import './App.css';
import { Section } from './components/section';
import { useIsInViewport } from './hooks/useIsInViewport';
import NavBar from './components/navBar'
import HeroSection from './components/heroSection'


const fetchMovies = async function(limit) {
  const response = await fetch('http://localhost:8888/.netlify/functions/getGenres', {
    method: "POST",
    body : limit
  })
  const responseBody = await response.json()
  return responseBody.data.reference_list.values
  
}


function App() {
  const genreIncrement = 4
  const [genres, setGenres] = useState(null)
  const [limit, setLimit] = useState(genreIncrement)
  const [limitReached, setLimitReached] = useState(false)
  const refPageEnd = useRef(null)
  const isInViewport1 = useIsInViewport(refPageEnd);

  useEffect(() => {
    // 👇️ listen for changes
    if(isInViewport1){
    if(!limitReached){
      setLimit(limit + genreIncrement)
    }
  }
  }, [isInViewport1]);

  useEffect(() => {
    fetchMovies(limit).then(values =>{
    if(values.length < limit) {
      setLimitReached(true)
    } else {
      setGenres(values)
    }
  }).catch(err => console.log(err))
  },[fetchMovies, limit])

  return (
    <>
    <NavBar />
    <HeroSection />
      {genres && (
        <div className="container">
        {genres.map((genre, index) => (<Section key={index} genre={genre.value}/>))}
        </div>
        )
        }
      <div className="page-end" ref={refPageEnd} />
    </>
  )
}

export default memo( App);
