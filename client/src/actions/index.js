import * as helpers from '../lib/index.js'

export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SHIP = 'ADD_SHIP';
export const ADD_SHIP_TO_ALREADY_CHOSEN_LIST = 'ADD_SHIP_TO_ALREADY_CHOSEN_LIST'
export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const CHANGE_TURN = 'CHANGE_TURN';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const COMPUTER_DESTROYS_PLAYER_SPOT = 'COMPUTER_DESTROYS_PLAYER_SPOT';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const INCREMENT_HIT_COUNT = 'INCREMENT_HIT_COUNT';
export const INCREMENT_SHIP_COUNT = 'INCREMENT_SHIP_COUNT';
export const SELECT_POSITION = 'SELECT_POSITION';
export const SELECT_SHIP = 'SELECT_SHIP';
export const START_GAME = 'START_GAME';

export const PLAYER_NAME = 'Player';
export const ENEMY_NAME = 'Computer';

export const onCellClick = (row, col, boardType) => {
  return (dispatch, getState) => {
    const state = getState();
    const gamePhase = state.gamePhase;
    const selectedShip = state.gameLogic.selectedPiece;
    const selectedPosition = state.gameLogic.selectedPosition;
    const playerBoard = state.gameLogic.playerBoard;
    const enemyBoard = state.gameLogic.enemyBoard;
    const alreadySelectedShips = state.gameLogic.alreadySelectedShips
    console.log('alreadySelectedShips', alreadySelectedShips)
    const playerShipCount = state.shipsOnBoard.playerShipCount;
    const { playerBoardHitCount, enemyBoardHitCount }  = state.hitCounts;

    if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {

      if (!selectedShip || !selectedPosition) {
        alert('Please select a ship and position');
        return;
      } else if (alreadySelectedShips.indexOf(selectedShip) > -1) {
        alert(`You have already chosen the ${selectedShip}. Please choose another`)
        return;
      }      

      dispatch(incrementShipCount())
      dispatch(addShip(selectedShip, selectedPosition, row, col));
      dispatch(addShipToAlreadyChosenList(selectedShip))
      if (playerShipCount === 4) {
        dispatch(changeGamePhase('battlePhase'))
        alert('Start Battle!');
      }
    } else if (gamePhase === 'battlePhase' && boardType === 'enemyBoard'){
      dispatch(destroyEnemySpot(row, col))
      if (enemyBoard[row][col].piece !== 'E') {
        dispatch(incrementHitCount('enemyBoard'))
        
       //16 because state hit count hasnt updated yet
        if (enemyBoardHitCount === 16) {
          dispatch(changeGamePhase('endGame'))
        }  else {
          // alert(`Enemy's Counter!`); 
          dispatch(changeTurn(ENEMY_NAME))
          setTimeout(()=> dispatch(enemyTurn(playerBoard)), 2000);         
        }
      } else {
        // alert(`Enemy's Turn!`);
        dispatch(changeTurn(ENEMY_NAME))
        setTimeout(()=> dispatch(enemyTurn(playerBoard)), 2000);         
      }
      // setTimeout(() => dispatch(computerDestroysPlayerSpot(playerBoard)), 2000)
    } else if (gamePhase === 'pregamePhase' && boardType === 'enemyBoard') {
      alert('Not ready to destroy!')
    } else {
      alert('Dont destroy your own ships!')
    }

  }
}

export const enemyTurn = (playerBoard) => {
  return (dispatch, getState) => {
    let {row, col} = helpers.destroyRandomSpotOnPlayerBoard(playerBoard);
    dispatch(computerDestroysPlayerSpot(row, col));
    if (playerBoard[row][col].piece !== 'E') {
      dispatch(incrementHitCount('playerBoard'));
      if (getState().hitCounts.playerBoardHitCount === 17) {
        dispatch(changeGamePhase('endGame'))
      }
    }
    dispatch(changeTurn(PLAYER_NAME))
  }
}

export const addShip = (selectedShip, selectedPosition, row, col) => {
  console.log('addShip', selectedShip, selectedPosition, row, col)
  if (!selectedShip || !selectedPosition) return;
  return {
    type: ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const addShipToAlreadyChosenList = selectedShip => {
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

export const destroyEnemySpot = (row, col) => {
  return {
    type: DESTROY_SPOT,
    row,
    col
  }
}

export const computerDestroysPlayerSpot = (row, col) => {
 // let {row, col} = helpers.destroyRandomSpotOnPlayerBoard(playerBoard);
  return {
    type: COMPUTER_DESTROYS_PLAYER_SPOT,
    row,
    col
  }
}
