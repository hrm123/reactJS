import { memo, useEffect, useRef, useState } from 'react';
import './App.css';
import { Section } from './components/section';
import { useIsInViewport } from './hooks/useIsInViewport';


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
    console.log('isInViewport1', isInViewport1);
    if(isInViewport1){
    if(!limitReached){
      setLimit(limit + genreIncrement)
    }
  }
  }, [isInViewport1]);

  useEffect(() => {
    console.log('limit', limit)
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
      {genres && (genres.map((genre, index) => (<Section key={index} genre={genre.value}/>)))}
      <div className="page-end" ref={refPageEnd} />
    </>
  )
}

export default memo( App);
