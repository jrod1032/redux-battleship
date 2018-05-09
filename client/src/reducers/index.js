import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';
import * as helpers from '../lib/index.js';
import { gamePieces } from '../gameConstants.js';

const initialState = {
  gamePhase: 'BeginGame',
  selectedPiece:'ACC',
  selectedPosition: 'vertical',
  playerBoard: helpers.createBoard(),
  enemyBoard: helpers.createBoardWithRandomPieces(),
  enemyFleet: [
    ['ACC', 0, gamePieces['ACC']], 
    ['BS', 0, gamePieces['BS']],
    ['C', 0, gamePieces['C']],
    ['D', 0, gamePieces['D']],
    ['S', 0, gamePieces['S']],
  ],
  playerFleet: [
    ['ACC', 0, gamePieces['ACC']], 
    ['BS', 0, gamePieces['BS']],
    ['C', 0, gamePieces['C']],
    ['D', 0, gamePieces['D']],
    ['S', 0, gamePieces['S']],
  ],
}

function gamePhase (state = 'pregamePhase', action) {
  switch(action.type) {
    case actions.CHANGE_GAME_PHASE:
      return action.phase;
    default: return state;  
  }
}

function shipsOnBoard(state = {playerShipCount: 0}, action) {
  switch(action.type) {
    case actions.INCREMENT_SHIP_COUNT:
      let newCount = state.playerShipCount;
      newCount++
      return Object.assign({}, state, {
        playerShipCount: newCount
      })
    default: return state;  
  }
}

function gameLogic (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_SHIP:
      return Object.assign({}, state, {
          playerBoard: helpers.getNewBoard(state.playerBoard, action)
      })
    case actions.SELECT_SHIP:
      return Object.assign({}, state, {
        selectedPiece: action.piece
      })    
    case actions.SELECT_POSITION: 
      return Object.assign({}, state, {
        selectedPosition: action.position
      })  
    case actions.DESTROY_SPOT:
      return Object.assign({}, state, {
        enemyBoard: state.enemyBoard.map((row, rowIdx) => {
          return row.map((spot, colIdx) => {
            if (rowIdx === action.row && colIdx === action.col) {
              return Object.assign({}, spot, {hit: true})
            }
            return spot;
          })
        }),
        enemyFleet: state.enemyFleet.map( shipHitCount => {
          let spotName = state.enemyBoard[action.row][action.col].piece;
          if (spotName === shipHitCount[0])  {
            shipHitCount[1]++;
            return shipHitCount
          }   
          return shipHitCount;
        })
      }) 
    case actions.COMPUTER_DESTROYS_PLAYER_SPOT:
      return Object.assign({}, state, {
        playerBoard: state.playerBoard.map((row, rowIdx) => {
          return row.map( (spot, colIdx) => {
            if (rowIdx === action.row && colIdx === action.col) {
              return Object.assign({}, spot, {hit: true})
            }
            return spot
          })
        }),
        playerFleet: state.playerFleet.map( shipHitCount => {
          let spotName = state.playerBoard[action.row][action.col].piece;
          if (spotName === shipHitCount[0]) {
            shipHitCount[1]++;
            return shipHitCount;
          }
          return shipHitCount;
        })
      })   
    default: return state  
  }
}

function hitCounts(state={playerBoardHitCount: 0, enemyBoardHitCount: 0}, action) {
  switch(action.type) {
    case actions.INCREMENT_HIT_COUNT:
    const boardHitType = action.boardType === 'playerBoard' ? 'playerBoardHitCount' : 'enemyBoardHitCount';
    let newCount = state[boardHitType];
    newCount++;
      return Object.assign({}, state, {
        [boardHitType]: newCount
      })
    default: return state  
  }
}

const BattleshipApp = combineReducers({
  gameLogic,
  gamePhase,
  shipsOnBoard,
  hitCounts
});


export default BattleshipApp;