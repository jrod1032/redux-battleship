import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { onCellClick } from '../actions/index.js';

const getVisibleBoard = (board, boardType) => {
  return board.map( (row, rowIdx) => {
    return row.map( (spot, colIdx) => {
      if (boardType === 'playerBoard') {
        if (!spot.hit && spot.piece !== 'E') {
          return spot.piece;
        } else if (spot.hit && spot.piece === 'E') {
          return 'miss';
        } else if (spot.hit && spot.piece !== 'E') {
          return 'X';
        } else {
          return '';
        }
      } else {
        if (!spot.hit) {
          return '';
        } else if (spot.hit && spot.piece === 'E') {
          return 'miss';
        } else if (spot.show){
          return spot.piece;
        } else {
          return 'X'
        }
      }
    })
  })
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    playerBoard: getVisibleBoard(state.gameLogic.playerBoard, 'playerBoard'),
    enemyBoard: getVisibleBoard(state.gameLogic.enemyBoard, 'enemyBoard'),
    selectedPiece: state.gameLogic.selectedPiece,
    selectedPos: state.gameLogic.selectedPosition,
    gamePhase: state.gameLogic.gamePhase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: (row, col, boardType) => dispatch(onCellClick(row, col, boardType) ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Board)