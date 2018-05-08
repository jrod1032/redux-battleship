import * as helpers from '../lib/index.js'

export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SHIP = 'ADD_SHIP';
export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const COMPUTER_DESTROYS_PLAYER_SPOT = 'COMPUTER_DESTROYS_PLAYER_SPOT';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const INCREMENT_SHIP_COUNT = 'INCREMENT_SHIP_COUNT';
export const SELECT_POSITION = 'SELECT_POSITION';
export const SELECT_SHIP = 'SELECT_SHIP';
export const START_GAME = 'START_GAME';

export const onCellClick = (row, col, boardType) => {
  return (dispatch, getState) => {
    const state = getState();
    const gamePhase = state.gamePhase;
    const selectedShip = state.gameLogic.selectedPiece;
    const selectedPosition = state.gameLogic.selectedPosition;
    const playerBoard = state.gameLogic.playerBoard;
    const playerShipCount = state.shipsOnBoard.playerShipCount;

    if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {
      dispatch(incrementShipCount())
      dispatch(addShip(selectedShip, selectedPosition, row, col));
      if (playerShipCount === 4) {
        alert('Start Battle!');
        dispatch(changeGamePhase('battlePhase'))
      }
    } else if (gamePhase === 'battlePhase' && boardType === 'enemyBoard'){
      dispatch(destroyEnemySpot(row, col))
      alert(`Enemy's turn!`);
      dispatch(computerDestroysPlayerSpot(playerBoard))
    } else if (gamePhase === 'pregamePhase' && boardType === 'enemyBoard') {
      alert('Not ready to destroy!')
    } else {
      alert('Dont destroy your own ships!')
    }

  }
}
export const addShip = (selectedShip, selectedPosition, row, col) => {
  return {
    type: ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const selectShip = (piece, position="vertical") => {
  return {
    type: SELECT_SHIP,
    piece,
    position
  }
}

export const selectPosition = (position) => {
  return {
    type: SELECT_POSITION,
    position
  }
}

export const incrementShipCount = () => {
  console.log('increment')
  return {
    type: INCREMENT_SHIP_COUNT
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

export const computerDestroysPlayerSpot = (playerBoard) => {
  let {row, col} = helpers.destroyRandomSpotOnPlayerBoard(playerBoard);
  console.log('randomrow', row);
  console.log('randomcol', col)
  return {
    type: COMPUTER_DESTROYS_PLAYER_SPOT,
    row,
    col
  }
}
