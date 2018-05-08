import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';
import * as helpers from '../lib/index.js';
import { gamePieces } from '../gameConstants.js';

function gameStatus(state = 'pregame', action) {
    console.log('start game');
    return null
}

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
    case actions.START_BATTLE:
      return Object.assign({}, state, {
        gamePhase: 'battlePhase'
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
             // return spot.piece === 'E' ?  Object.assign({}, spot, {hit: true})
             // : Object.assign({}, spot, 
             //  { hit: true, 
             //    enemyFleet: state.enemyFleet.map( shipHitCount => {
             //      if (shipHitCount[0] === spot.piece) {
             //        shipHitCount[1]++;
             //      }
             //      return shipHitCount;
             //    } )
             //  })
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
    default: return state  
  }
}
// const initialFleetState = 

// function fleetState (state = initialFleetState, action) {
//   switch(action.type) {
//     case actions.DESTROY_SPOT:
//       if ()
//       return Object.assign({}, state, {

//       })
//   }
// }

function battleState (state = initialState, action) {
  switch(action.type) {

    default: return state;  
  }
}

const BattleshipApp = combineReducers({
  gamePhase, 
  gameLogic,
  battleState
});


export default BattleshipApp;