
import { useEffect, useState } from 'react';

export const Card = ({movie }) => {

    return (<><div>card
        <h4>{movie.title}</h4>
        <h4>{movie.duration}</h4>
        <video>
            <source src={movie.thumbnail} type="video/mp4" />
        </video>
    </div>
    </>)
}