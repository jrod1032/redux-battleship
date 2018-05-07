import React from 'react';
import { connect } from 'react-redux';
import { selectShip } from '../actions/index'

const ShipButton = (props) => (
  <button type="button" name={props.name} onClick={e => {
    props.dispatch(selectShip(e.target.name))
  }}>{props.name}</button>
  ) 

export default connect()(ShipButton);