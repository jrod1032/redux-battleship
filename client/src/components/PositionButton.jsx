import React from 'react';

const PositionButton = (props) => {
  const selectionClass = props.selectedPosition && props.selectedPosition === props.name ? 'selected' : 'unselected';

  return (
  <button type="button" name={props.name} className={selectionClass} onClick={e => {
    props.onButtonClick(e.target.name)
  }}>{props.name}</button>
  ) 
}

export default PositionButton;