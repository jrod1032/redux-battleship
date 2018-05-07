import { connect } from 'react-redux';
import Board from '../components/Board.jsx';

const getVisibleBoard = (board, boardType) => {
  console.log('visibleboard', board)
  return board;
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    board: getVisibleBoard(state.gameLogic.playerBoard)
  }
}

export default connect(
  mapStateToProps
  )(Board)