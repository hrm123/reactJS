
function heartpress(state, action) {
  if (!state.gameState.started) return state;


  return {
    ...state,
    heartClicked: true,
  };
}

export default heartpress;
