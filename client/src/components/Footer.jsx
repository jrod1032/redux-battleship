import React from 'react';
import ShipButton from '../containers/visibleShipButton.js';
import PositionButton from './PositionButton.jsx';

const Footer = (props) => (
  <div class="footer">
    <ShipButton name="ACC" displayName="AirCraft Carrier" />
    <ShipButton name="BS" displayName="Battleship" />
    <ShipButton name="C" displayName="Cruiser" />
    <ShipButton name="S" displayName="Sub" />
    <ShipButton name="D" displayName="Destroyer" />
    <PositionButton name="horizontal" />
    <PositionButton name="vertical" />
  </div>  
  )

export default Footer;