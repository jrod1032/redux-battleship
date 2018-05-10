import React from 'react';
import { connect } from 'react-redux';

const ShipButton = (props) => {

    let buttonStyles = {
    'borderColor': 'black',
    'borderRadius': '10%',
    'marginLeft': '10px',
    'padding': '2px'
  }

  buttonStyles.borderColor = props.selectedPiece && props.selectedPiece === props.name ? 'gold' : 'black';

  return ( 
  <button type="button" name={props.name} style={buttonStyles} onClick={e => {
    props.onButtonClick(e.target.name)
  }}>{props.displayName}</button>
  ) 
}


export default ShipButton;