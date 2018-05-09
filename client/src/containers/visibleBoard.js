import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { onCellClick } from '../actions/index.js';

const getVisibleBoard = (board, boardType) => {
  return board.map( (row, rowIdx) => {
    return row.map( (spot, colIdx) => {
      if (boardType === 'playerBoard') {
        if (!board[rowIdx][colIdx].hit && board[rowIdx][colIdx].piece !== 'E') {
          return board[rowIdx][colIdx].piece;
        } else if (board[rowIdx][colIdx].hit && board[rowIdx][colIdx].piece === 'E') {
          return 'miss';
        } else if (board[rowIdx][colIdx].hit && board[rowIdx][colIdx].piece !== 'E') {
          return 'X';
        } else {
          return '';
        }
      } else {
        if (!board[rowIdx][colIdx].hit) {
          return '';
        } else if (board[rowIdx][colIdx].hit && board[rowIdx][colIdx].piece === 'E') {
          return 'miss';
        } else {
          return 'X';
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