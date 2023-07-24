import { useEffect, useState } from 'react';
import './App.css';
import { Section } from './components/section';

function App() {

  const [genres, setGenres] = useState(null)


  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8888/.netlify/functions/getGenres')
    const responseBody = await response.json()
    setGenres(responseBody.data.reference_list.values)
  }

  useEffect(() => {
    fetchMovies()
  },[])

  return (
    <div>
      {
        genres && genres.map(genre => <Section genre={genre.value}/>)
      }
      
    </div>
  );
}

export default App;
