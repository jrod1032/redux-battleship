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

const getCursorOnEnter = (gamePhase, selectedPiece, selectedPosition) => {
  if (gamePhase === 'pregamePhase' && selectedPiece && selectedPosition) {
    document.getElementsByClassName('playerBoard')[0].style.cursor = 'copy'
  } else {
    document.getElementsByClassName('playerBoard')[0].style.cursor = 'default'
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  const {selectedPiece, selectedPosition} = state.gameLogic;
  return {
    playerBoard: getVisibleBoard(state.gameLogic.playerBoard, 'playerBoard'),
    enemyBoard: getVisibleBoard(state.gameLogic.enemyBoard, 'enemyBoard'),
    selectedPiece: selectedPiece,
    selectedPos: selectedPosition,
    gamePhase: state.gamePhase,
    getCursorOnEnter: () => getCursorOnEnter(state.gamePhase, selectedPiece, selectedPosition)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: (row, col, boardType) => dispatch(onCellClick(row, col, boardType) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Board)