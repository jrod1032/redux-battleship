import React from 'react';
import VisibleBoard from '../containers/visibleBoard';
import Footer from './Footer.jsx';
import FleetStats from '../containers/fleetStats'

const BattleshipGame = () => (
    <div class="container">
      <FleetStats fleet="playerFleet"/>
      <div id="shots">shots Left</div>
      <FleetStats fleet="enemyFleet"/>
      <div id="playerName">Jarrod</div>
      <div id="enemyName">Computer</div>
      <VisibleBoard className="playerBoard" boardType="playerBoard"/>
      <VisibleBoard className="enemyBoard" boardType="enemyBoard"/>
      <Footer className="footer" />   
    </div>
  )

export default BattleshipGame;