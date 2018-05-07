import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { addShip, selectShip } from '../actions/index.js'

const getVisibleBoard = (board, boardType) => {
  return board
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    board: getVisibleBoard(state.gameLogic.playerBoard, state.gameLogic.gameState),
    selectedShip: state.gameLogic.selected.piece,
    selectedPos: state.gameLogic.selected.pos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addShip: (selectedShip, selectedPosition, rowIdx, colIdx) => dispatch(addShip(selectedShip, selectedPosition, rowIdx, colIdx)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Board)