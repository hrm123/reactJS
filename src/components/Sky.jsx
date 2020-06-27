import React from 'react';
import { skyAndGroundWidth } from '../utils/constants';

const Sky = (props) => {
  const skyStyle = {
    fill: '#30abef',
  };

  const onSkyClick = () => {
    props.onskyClick();
  }

  const gameHeight = 1200;
  return (
    <g id="GroupSky" onClick={onSkyClick}>
    <rect 
      style={skyStyle}
      x={skyAndGroundWidth / -2}
      y={100 - gameHeight}
      width={skyAndGroundWidth}
      height={gameHeight}
    />
    </g>
  );
};

export default Sky;
