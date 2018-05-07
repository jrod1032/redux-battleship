import { combineReducers } from 'redux';
import * as actions from '../actions/index.js'
import { gamePieces } from '../gameConstants.js'

function gameStatus(state = 'pregame', action) {
    console.log('start game');
    return null
}

// function gameScore(state = {}, action) {
//   switch (action.type) {
//     case actions.ADD_SCORE:
//       return Object.assign({}, state, {points: action.points + state.points})
//   }
// }
const createBoard = (board) => {
  const newBoard = [];
  for (let m = 0; m < 10; m++) {
    let row = [];
    for (let n = 0; n < 10; n++) {
      let piece = board ? board[m][n] : {piece: 'E', pos: null, hit: false};
      row.push(piece);
    }
    newBoard.push(row);
  }
  return newBoard;
}


const getNewBoard = (board, action) => {
  const newBoard = createBoard(board);
  const newPiece = {piece: action.piece, pos: action.pos, hit: false}
  console.log('newPiece', newPiece)
  if (action.pos === 'horizontal') {
    for (let n = 0; n < gamePieces[action.piece]; n++) {
      newBoard[action.row][n + action.col] = newPiece;
    }
  } else {
    for (let m = 0; m < gamePieces[action.piece]; m++) {
      newBoard[m + action.row][action.col] = newPiece;
    }
  }
  return newBoard;
}
const initialState = {
  gameState: 'BeginGame',
  selectedPiece:'ACC',
  selectedPosition: 'vertical',
  playerBoard: createBoard(),
  enemyBoard: createBoard()
}

function gameLogic (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_SHIP:
      return Object.assign({}, state, {
          playerBoard: getNewBoard(state.playerBoard, action)
      })
    case actions.DESTROY_SPOT:
      return Object.assign({}, state, {
        enemyBoard: state.enemyBoard.map((row, rowIdx) => {
          return row.map((ship, colIdx) => {
            if (rowIdx === action.row && colIdx === action.col) {
              return Object.assign({}, ship, {
                hit: true
              })
            }
            return ship;
          })
        })
      })
    case actions.SELECT_SHIP:
      return Object.assign({}, state, {
        selectedPiece: action.piece
      })    
    case actions.SELECT_POSITION: 
      return Object.assign({}, state, {
        selectedPosition: action.position
      })  
    default: return state  
  }
}

const BattleshipApp = combineReducers({
  gameStatus, 
  gameLogic
});


export default BattleshipApp;