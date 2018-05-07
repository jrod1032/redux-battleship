import React from 'react';
import VisibleBoard from '../containers/visibleBoard';

const BattleshipGame = () => (
    <div class="container">
      <div id="myFleet">myStats</div>
      <div id="shots">shots Left</div>
      <div id="enemyFleet">enemyFleet</div>
      <div id="playerName">Jarrod</div>
      <div id="enemyName">Computer</div>
      <VisibleBoard className="playerBoard" />
      <VisibleBoard className="enemyBoard" />
      <div className="footer"></div>    
    </div>
  )

export default BattleshipGame;