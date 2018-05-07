import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';
import * as helpers from '../lib/index.js';
import { gamePieces } from '../gameConstants.js';

function gameStatus(state = 'pregame', action) {
    console.log('start game');
    return null
}

const initialState = {
  gameState: 'BeginGame',
  selectedPiece:'ACC',
  selectedPosition: 'vertical',
  playerBoard: helpers.createBoard(),
  enemyBoard: helpers.createBoardWithRandomPieces()
}

function gameLogic (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_SHIP:
      return Object.assign({}, state, {
          playerBoard: helpers.getNewBoard(state.playerBoard, action)
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