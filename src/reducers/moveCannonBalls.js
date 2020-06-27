import { calculateNextPosition } from '../utils/formulas';
let iter = 0;

const moveBalls = cannonBalls => {
  iter ++;
  return cannonBalls
    .filter(cannonBall => (
      cannonBall.position.y > -800 && cannonBall.position.x > -500 && cannonBall.position.x < 500
    ))
    .map((cannonBall) => {
      // console.log(`${iter}:cannonBall`, cannonBall);
      const { x, y } = cannonBall.position;
      const { angle } = cannonBall;
      return {
        ...cannonBall,
        position: calculateNextPosition(x, y, angle, 5),
      };
    })
  };

export default moveBalls;
