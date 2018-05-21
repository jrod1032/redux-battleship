import * as helpers from '../lib/index.js';
import { gamePieces, targetDirectionList } from '../gameConstants.js';
import hit_ship from '../../dist/sounds/hit_ship.mp3';
import splash from '../../dist/sounds/splash.mp3';
import destroy_ship from '../../dist/sounds/destroy_ship.mp3';
import add_piece from '../../dist/sounds/add_piece.mp3';

export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SHIP = 'ADD_SHIP';
export const ADD_SHIP_TO_ALREADY_CHOSEN_LIST = 'ADD_SHIP_TO_ALREADY_CHOSEN_LIST';
export const CHANGE_COMPUTER_MODE = 'CHANGE_COMPUTER_MODE';
export const CHANGE_FIRST_SPOT_HIT = 'CHANGE_FIRST_SPOT_HIT';
export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const CHANGE_HIT_LAST_TURN = 'CHANGE_HIT_LAST_TURN';
export const CHANGE_LAST_SPOT_HIT = 'CHANGE_LAST_SPOT_HIT';
export const CHANGE_TARGET_DIRECTION = 'CHANGE_TARGET_DIRECTION';
export const CHANGE_TURN = 'CHANGE_TURN';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const DESTROY_SHIP = 'DESTROY_SHIP';
export const INCREMENT_HIT_COUNT = 'INCREMENT_HIT_COUNT';
export const INCREMENT_SHIP_COUNT = 'INCREMENT_SHIP_COUNT';
export const SELECT_POSITION = 'SELECT_POSITION';
export const SELECT_SHIP = 'SELECT_SHIP';
export const START_GAME = 'START_GAME';
export const PLAYER_NAME = 'Player';
export const ENEMY_NAME = 'Computer';

//Sounds

const hitShipSound = new Audio(hit_ship)
const splashSound = new Audio(splash)
const destroyShipSound = new Audio(destroy_ship)
const addPieceSound = new Audio(add_piece)

//Thunks

export const onCellClick = (row, col, boardType) => {
  return (dispatch, getState) => {
    const state = getState();
    const gamePhase = state.gamePhase;
    const { selectedPiece, selectedPosition, playerBoard, enemyBoard, alreadySelectedShips, enemyFleet} = state.gameLogic
    const { playerBoardHitCount, enemyBoardHitCount }  = state.hitCounts;
    const { playerShipCount } = state.shipsOnBoard;

    if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {
      //check invalid user actions
      if (!selectedPiece || !selectedPosition) {
        alert('Please select a ship and position');
        return;
      } else if (alreadySelectedShips.indexOf(selectedPiece) > -1) {
        alert(`You have already chosen the ${selectedPiece}. Please choose another`)
        return;
      } else if (!helpers.checkIfRangeIsValid(row, col, gamePieces[selectedPiece], selectedPosition, playerBoard)) {
        alert('Invalid spot!');
        return;
      }    

      dispatch(incrementShipCount())
      dispatch(addShip(selectedPiece, selectedPosition, row, col));
      dispatch(addShipToAlreadyChosenList(selectedPiece))
      addPieceSound.play();
      if (playerShipCount === 4) {
        dispatch(changeGamePhase('battlePhase'))
        alert('Start Battle!');
      }
    } else if (gamePhase === 'battlePhase' && boardType === 'enemyBoard'){
      dispatch(destroyEnemySpot(row, col, 'enemyBoard', 'enemyFleet'))
      
      if (enemyBoard[row][col].piece !== 'E') {
        dispatch(onSpotIsHit(enemyBoard[row][col], enemyFleet, enemyBoardHitCount))
        dispatch(changeTurn(ENEMY_NAME))
        setTimeout(()=> dispatch(enemyTurn()), 5000);
      } else {
        splashSound.play();
        dispatch(changeTurn(ENEMY_NAME))
        setTimeout(()=> dispatch(enemyTurn(playerBoard)), 3000);         
      }
    } else if (gamePhase === 'pregamePhase' && boardType === 'enemyBoard') {
      alert('Not ready to destroy!')
    } else {
      alert('Dont destroy your own ships!')
    }

  }
}

const enemyTurn = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.gamePhase === 'endGame') {return ;}

    const { playerBoard, playerFleet } = state.gameLogic;
    const { playerBoardHitCount } = state.hitCounts;
    const { mode, targetDirection, firstSpotHit, lastSpotHit, didComputerHitLastTurn } = state.computerMoveLogic;
    
    const { row, col, currentTargetDirection } = helpers.decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn)
    dispatch(destroyEnemySpot(row, col, 'playerBoard', 'playerFleet'))
    if (playerBoard[row][col].piece !== 'E') {
      //enemy hits ship on player board
      if (mode === 'target') {
        dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount))
        dispatch(changeLastSpotHit(row, col));
        dispatch(changeTargetDirection(currentTargetDirection))
        dispatch(changeTurn(PLAYER_NAME))

      } else {
        dispatch(changeComputerMode('target'));
        dispatch(changeFirstSpotHit(row, col));
        dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount));
        dispatch(changeTurn(PLAYER_NAME));
      }
    } else {
      splashSound.play();
      if (mode === 'target') {
        dispatch(changeTargetDirection(helpers.getNextTargetDirection(targetDirection)))  
        dispatch(changeHitLastTurn(false));
      }
      dispatch(changeTurn(PLAYER_NAME));
    }
  }
}

const onSpotIsHit = (spot, fleet, boardHitCount) => {
  return (dispatch, getState) => {
    if (helpers.isShipDestroyed(spot, fleet)) {
      dispatch(destroyShip(spot, 'enemyBoard'));
      destroyShipSound.play();
      dispatch(incrementHitCount('enemyBoard'));
      // count is 4 because hit count has not dispatched yet
      if (boardHitCount === 4) {
        dispatch(changeGamePhase('endGame'));
      } 

    } else {
      hitShipSound.play();
    }
  }
}

const onPlayerSpotIsHit = (spot, fleet, boardHitCount) => {
  return (dispatch, getState) => {
    if (helpers.isShipDestroyed(spot, fleet)) {
      dispatch(destroyShip(spot, 'playerBoard'));
      destroyShipSound.play();
      dispatch(incrementHitCount('playerBoard'))
      dispatch(changeComputerMode('hunt'));
      if (boardHitCount === 4) {
        dispatch(changeGamePhase('endGame'));
      }
    } else {
      hitShipSound.play();
      dispatch(changeHitLastTurn(true));
    }
  }
}

//Action creators

export const addShip = (selectedShip, selectedPosition, row, col) => {
  if (!selectedShip || !selectedPosition) return;
  return {
    type: ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const addShipToAlreadyChosenList = (selectedShip) => {
  return {
    type: ADD_SHIP_TO_ALREADY_CHOSEN_LIST,
    selectedShip
  }
}

export const selectShip = (piece, position="vertical") => {
  if (!piece) return;
  return {
    type: SELECT_SHIP,
    piece,
    position
  }
}

export const selectPosition = (position) => {
  if (!position) return;
  return {
    type: SELECT_POSITION,
    position
  }
}

export const incrementShipCount = () => {
  return {
    type: INCREMENT_SHIP_COUNT
  }
}

export const incrementHitCount = (boardType) => {
  return {
    type: INCREMENT_HIT_COUNT,
    boardType
  }
}

export const changeTurn = (turn) => {
  return {
    type: CHANGE_TURN,
    turn
  }
}
export const changeGamePhase = (phase) => {
  return {
    type: CHANGE_GAME_PHASE,
    phase
  }
}

export const changeComputerMode = (mode) => {
  return {
    type: CHANGE_COMPUTER_MODE,
    mode
  }
}

export const changeTargetDirection = (targetDirection) => {
  return {
    type: CHANGE_TARGET_DIRECTION,
    targetDirection
  }
}

export const changeFirstSpotHit = (row, col) => {
  return {
    type: CHANGE_FIRST_SPOT_HIT,
    row,
    col
  }
}
export const changeLastSpotHit = (row, col) => {
  return {
    type: CHANGE_LAST_SPOT_HIT,
    row, 
    col
  }
}

export const changeHitLastTurn = (hit) => {
  return {
    type: CHANGE_HIT_LAST_TURN,
    hit
  }
}


export const destroyEnemySpot = (row, col, board, fleet) => {
  return {
    type: DESTROY_SPOT,
    row,
    col,
    board,
    fleet
  }
}

export const destroyShip = (ship, board) => {
  return {
    type: DESTROY_SHIP,
    ship: ship,
    board: board
  }
}
