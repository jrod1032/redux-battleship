import React from 'react';
import { connect } from 'react-redux';
import { selectPosition } from '../actions/index'

const PositionButton = (props) => (
  <button type="button" name={props.name} onClick={e => {
    props.dispatch(selectPosition(e.target.name))
  }}>{props.name}</button>
  ) 

export default connect()(PositionButton);