import React from 'react';
import ShipButton from './ShipButton.jsx';
import PositionButton from './PositionButton.jsx';

const Footer = (props) => (
  <div class="footer">
    <ShipButton name="ACC" />
    <ShipButton name="BS" />
    <ShipButton name="C" />
    <ShipButton name="S" />
    <ShipButton name="D" />
    <PositionButton name="horizontal" />
    <PositionButton name="vertical" />
  </div>  
  )

export default Footer;