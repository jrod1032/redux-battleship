import React from 'react';

const GamePhaseBoard = (props) => {
 
  return (
  <div id="gamePhase">
    <div id="gamePhaseTitle">{props.gamePhase.toUpperCase()}</div>
  </div>
  )
}

export default GamePhaseBoard;