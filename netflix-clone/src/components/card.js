
import { useEffect, useState } from 'react';

export const OldCard = ({movie }) => {

    return (<><div >
        <h4>{movie.title}</h4>
        <h4>{movie.duration}</h4>
        <video width="320" height="240"
            // onMouseOver={event => event.target.play()}
            // onMouseOut={event => event.target.pause()}
        >
            <source src={movie.thumbnail} type="video/mp4" controls/>
        </video>
    </div>
    </>)
}

export const Card = ({movie}) => {
    const [isShown, setIsShown] = useState(false)

    return (
      <div
        className="card"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {!isShown && (
          <video className="video" controls autoplay={false}>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
        )}
  
        {isShown && (
          <>
            <video className="video" controls autoPlay={true} loop muted>
              <source src={movie.thumbnail} type="video/mp4" />
            </video>
            <div className="info-box">
              <p>{movie.title}</p>
            </div>
          </>
        )}
      </div>
    )
}