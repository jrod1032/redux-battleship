import React from 'react';

const ShipButton = (props) => {

  //   let buttonStyles = {
  //   'borderColor': 'black',
  //   'borderRadius': '10%',
  //   'marginLeft': '10px',
  //   'padding': '2px'
  // }

  const selectionClass = props.selectedPiece && props.selectedPiece === props.name ? 'selected' : 'unselected';

  return ( 
  <button type="button" name={props.name} className={selectionClass} onClick={e => {
    props.onButtonClick(e.target.name)
  }}>{props.displayName}</button>
  ) 
}


export default ShipButton;