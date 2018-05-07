import React from 'react';
import VisibleBoard from '../containers/visibleBoard';
import Footer from './Footer.jsx';

const BattleshipGame = () => (
    <div class="container">
      <div id="myFleet">myStats</div>
      <div id="shots">shots Left</div>
      <div id="enemyFleet">enemyFleet</div>
      <div id="playerName">Jarrod</div>
      <div id="enemyName">Computer</div>
      <VisibleBoard className="playerBoard" boardType="playerBoard"/>
      <VisibleBoard className="enemyBoard" boardType="enemyBoard"/>
      <Footer className="footer" />   
    </div>
  )

export default BattleshipGame;