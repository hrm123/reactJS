import { calculateAngle } from '../utils/formulas';
let iter = 0;

function shoot(state, action) {
  if (!state.gameState.started) return state;

  const { cannonBalls } = state.gameState;
  
  const { x, y } = action.mousePosition;

  const angle = calculateAngle(0, 0, x, y);
  const angle1 = calculateAngle(0, 0, x-40, y+40);
  const angle2 = calculateAngle(0, 0, x-60, y+60);

  const now = new Date();
  const id = now.getTime();

  
  let cannonBall = [
  {
    position: { x: 0, y: 0 },
    angle,
    id: iter++,
  }];

  if(state.heartClicked){
    const id1 = (new Date(now + 100 * 3 + 1000 * 3)).getTime();
    cannonBall.push({
      position: { x: 0, y: 0 },
      angle : angle1,
      id: iter++,
    });
    const id2 = (new Date(now + 100 * 3 + 1000 * 6)).getTime();

    cannonBall.push({
      position: { x: 0, y: 0 },
      angle : angle2,
      id: iter++,
    });

  }

  return {
    ...state,
    heartClicked: false,
    gameState: {
      ...state.gameState,
      cannonBalls: [...cannonBalls, ...cannonBall],
    }
  };
}

export default shoot;
