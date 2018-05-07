import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { addShip, selectShip } from '../actions/index.js'

const getVisibleBoard = (board, boardType) => {
  return board
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    board: state.gameLogic.playerBoard,
    selectedPiece: state.gameLogic.selectedPiece,
    selectedPos: state.gameLogic.selectedPosition
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addShip: (selectedPiece, selectedPosition, rowIdx, colIdx) => dispatch(addShip(selectedPiece, selectedPosition, rowIdx, colIdx)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Board)