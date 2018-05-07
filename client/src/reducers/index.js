import { combineReducers } from 'redux';
import * as actions from '../actions/index.js'


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
const createBoard = () => {
  const initialBoard = [];
  for (let m = 0; m < 10; m++) {
    let row = [];
    for (let n = 0; n < 10; n++) {
      row.push({piece: 'E', pos: null, hit: false});
    }
    initialBoard.push(row);
  }
  return initialBoard;
}

const initialState = {
  gameState: 'BeginGame',
  selected: {piece: 'ACC', pos: 'vertical'},
  playerBoard: createBoard(),
  enemyBoard: createBoard()
}

function gameLogic (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_SHIP:
      return Object.assign({}, state, {
        playerBoard:  state.playerBoard.map((row, rowIdx) => {
          return row.map((ship, colIdx) => {
            if (rowIdx === action.row && colIdx === action.col) {
              return Object.assign({}, ship, {
                piece: action.piece,
                pos: action.pos,
                hit: false
              })
            }
            return ship;
          })
        })
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
        selected: {piece: action.piece, pos: 'vertical'}
      })    
    default: return state  
  }
}

const BattleshipApp = combineReducers({
  gameStatus, 
  gameLogic
});


export default BattleshipApp;